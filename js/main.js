function main() {

    function ShaderProgram(GL) {
        this.GL = GL;
        this.shaderProgram = this.GL.createProgram();
        this.shaders = [];
        this.attributes = {};
        this.uniforms = {};
    }

    ShaderProgram.prototype = {
        getShader: function(sourceScriptId) {
            var shaderScript = document.getElementById(sourceScriptId);
            if (!shaderScript) {
                throw new Error("Shader source script doesn't exists.");
            }
            var shader = null;

            var str = "";
            var k = shaderScript.firstChild;
            while (k) {
                if (k.nodeType == 3) {
                    str += k.textContent;
                }
                k = k.nextSibling;
            }

            if (shaderScript.type == "x-shader/x-fragment") {
                shader = this.GL.createShader(this.GL.FRAGMENT_SHADER);
            } else if (shaderScript.type == "x-shader/x-vertex") {
                shader = this.GL.createShader(this.GL.VERTEX_SHADER);
            } else {
                throw new Error("Invalid type of shader script.");
            }

            this.GL.shaderSource(shader, str);
            this.GL.compileShader(shader);

            if (!this.GL.getShaderParameter(shader, this.GL.COMPILE_STATUS)) {
                throw new Error(this.GL.getShaderInfoLog(shader));
            }
            return shader;
        },
        addShader: function(shaderScriptId) {
            this.shaders.push(this.getShader(shaderScriptId));
        },
        run: function() {
            var shaderProgram = this.shaderProgram;
            var GL = this.GL;
            this.shaders.forEach(function(shader) {
                GL.attachShader(shaderProgram, shader);
            });
            GL.linkProgram(shaderProgram);
            if (!GL.getProgramParameter(shaderProgram, GL.LINK_STATUS)) {
                throw new Error("Could not initialise shaders");
            }
            GL.useProgram(shaderProgram);
        },
        addAttribute: function(key, name) {
            this.attributes[key] = this.GL.getAttribLocation(this.shaderProgram, name);
            this.GL.enableVertexAttribArray(this.attributes[key]);
        },
        getAttribute: function(key) {
            if(this.attributes.hasOwnProperty(key)) {
                return this.attributes[key];
            } else {
                throw new Error("Attribute doesn't exist.");
            }
        },
        addUniform: function(key, name) {
            this.uniforms[key] = this.GL.getUniformLocation(this.shaderProgram, name);
        },
        setUniformMatrix4: function(key, matrix) {
            this.GL.uniformMatrix4fv(this.uniforms[key], false, matrix);
        },
        setUniformMatrix3: function(key, matrix) {
            this.GL.uniformMatrix3fv(this.uniforms[key], false, matrix);
        },
        setUniformVector3: function(key, vector3) {
            this.GL.uniform3fv(this.uniforms[key], vector3);
        },
        setUniformFloat: function(key, value) {
            this.GL.uniform1f(this.uniforms[key], value);
        },
        setUniformInteger: function(key, value) {
            this.GL.uniform1i(this.uniforms[key], value);
        }
    };

    function VertexBufferObject(GL) {
        this.GL = GL;
        this.buffer = this.GL.createBuffer();
        this.itemSize = null;
        this.numItems = null;
    }

    VertexBufferObject.prototype = {
        init: function(elements, itemSize, numItems) {
            this.itemSize = itemSize;
            this.numItems = numItems;
            this.GL.bindBuffer(this.GL.ARRAY_BUFFER, this.buffer);
            this.GL.bufferData(this.GL.ARRAY_BUFFER, new Float32Array(elements), this.GL.STATIC_DRAW);
        },
        bind: function(attribute) {
            this.GL.bindBuffer(this.GL.ARRAY_BUFFER, this.buffer);
            this.GL.vertexAttribPointer(attribute, this.itemSize, this.GL.FLOAT, false, 0, 0);
        }
    };

    function IndexBufferObject(GL) {
        this.GL = GL;
        this.buffer = this.GL.createBuffer();
        this.itemSize = null;
        this.numItems = null;
    }

    IndexBufferObject.prototype = {
        init: function(elements, itemSize, numItems) {
            this.itemSize = itemSize;
            this.numItems = numItems;
            this.GL.bindBuffer(this.GL.ELEMENT_ARRAY_BUFFER, this.buffer);
            this.GL.bufferData(this.GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(elements), this.GL.STATIC_DRAW);
        },
        bind: function() {
            this.GL.bindBuffer(this.GL.ELEMENT_ARRAY_BUFFER, this.buffer);
        }
    };

    function Primitive() {
        this.vertices = null;
        this.normals = null;
        this.colors = null;
        this.indices = null;
    }

    Primitive.prototype = {
        getVertices: function() {
            return this.vertices;
        },
        getNormals: function() {
            return this.normals;
        },
        getColors: function() {
            return this.colors;
        },
        getIndices: function() {
            return this.indices;
        }
    };

    function Cube() {
        Primitive.call(this);
        this.vertices = {
            elements: [
                // Front face
                -1.0, -1.0, 1.0,
                1.0, -1.0, 1.0,
                1.0, 1.0, 1.0,
                -1.0, 1.0, 1.0,

                // Back face
                -1.0, -1.0, -1.0,
                -1.0, 1.0, -1.0,
                1.0, 1.0, -1.0,
                1.0, -1.0, -1.0,

                // Top face
                -1.0, 1.0, -1.0,
                -1.0, 1.0, 1.0,
                1.0, 1.0, 1.0,
                1.0, 1.0, -1.0,

                // Bottom face
                -1.0, -1.0, -1.0,
                1.0, -1.0, -1.0,
                1.0, -1.0, 1.0,
                -1.0, -1.0, 1.0,

                // Right face
                1.0, -1.0, -1.0,
                1.0, 1.0, -1.0,
                1.0, 1.0, 1.0,
                1.0, -1.0, 1.0,

                // Left face
                -1.0, -1.0, -1.0,
                -1.0, -1.0, 1.0,
                -1.0, 1.0, 1.0,
                -1.0, 1.0, -1.0
            ],
            itemSize: 3,
            numItems: 24
        };
        this.normals = {
            elements: [
                // Front face
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,

                // Back face
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,

                // Top face
                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0,

                // Bottom face
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,

                // Right face
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,

                // Left face
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0
            ],
            itemSize: 3,
            numItems: 24
        };
        this.colors = {
            elements: [
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0
            ],
            itemSize: 4,
            numItems: 24
        };
        this.indices = {
            elements: [
                0, 1, 2,      0, 2, 3,    // Front face
                4, 5, 6,      4, 6, 7,    // Back face
                8, 9, 10,     8, 10, 11,  // Top face
                12, 13, 14,   12, 14, 15, // Bottom face
                16, 17, 18,   16, 18, 19, // Right face
                20, 21, 22,   20, 22, 23  // Left face
            ],
            itemSize: 1,
            numItems: 36
        };
    }

    Cube.prototype = Object.create(Primitive.prototype);

    function Drawable(GL, primitive) {
        this.GL = GL;
        this.positionBuffer = new VertexBufferObject(GL);
        this.colorBuffer = new VertexBufferObject(GL);
        this.normalBuffer = new VertexBufferObject(GL);
        this.indexBuffer = new IndexBufferObject(GL);

        this.positionBuffer.init(primitive.getVertices().elements, primitive.getVertices().itemSize, primitive.getVertices().numItems);
        this.colorBuffer.init(primitive.getColors().elements, primitive.getColors().itemSize, primitive.getColors().numItems);
        this.normalBuffer.init(primitive.getNormals().elements, primitive.getNormals().itemSize, primitive.getNormals().numItems);
        this.indexBuffer.init(primitive.getIndices().elements, primitive.getIndices().itemSize, primitive.getIndices().numItems);
    }

    Drawable.prototype = {
        draw: function(shaderProgram, projectionMatrix, modelViewMatrix, state) {
            this.positionBuffer.bind(shaderProgram.getAttribute("vertexPositionAttribute"));
            this.normalBuffer.bind(shaderProgram.getAttribute("vertexNormalAttribute"));
            this.colorBuffer.bind(shaderProgram.getAttribute("vertexColorAttribute"));
            this.indexBuffer.bind();

            var normalMatrix = mat3.create();
            mat3.fromMat4(normalMatrix, modelViewMatrix);
            mat3.invert(normalMatrix, normalMatrix);
            mat3.transpose(normalMatrix, normalMatrix);

            shaderProgram.setUniformMatrix4("pMatrixUniform", projectionMatrix);
            shaderProgram.setUniformMatrix4("mvMatrixUniform", modelViewMatrix);
            shaderProgram.setUniformMatrix3("nMatrixUniform", normalMatrix);

            shaderProgram.setUniformInteger("useLighting", state.useLighting);
            shaderProgram.setUniformInteger("useDirectionalLighting", state.useDirectionalLighting);
            shaderProgram.setUniformInteger("usePointLighting", state.usePointLighting);
            shaderProgram.setUniformInteger("useSpecularLighting", state.useSpecularLighting);

            shaderProgram.setUniformVector3("ambientColor", state.ambientColor);

            shaderProgram.setUniformVector3("lightingDirection", state.lightingDirection);
            shaderProgram.setUniformVector3("directionalColor", state.directionalColor);

            shaderProgram.setUniformVector3("pointLightingLocation", state.pointLightingLocation);
            shaderProgram.setUniformVector3("pointLightingDiffuseColor", state.pointLightingDiffuseColor);

            shaderProgram.setUniformVector3("pointLightingSpecularColor", state.pointLightingSpecularColor);
            shaderProgram.setUniformFloat("materialShininess", state.materialShininess);

            this.GL.drawElements(this.GL.TRIANGLES, this.indexBuffer.numItems, this.GL.UNSIGNED_SHORT, 0);
        }
    };

    function WebGL(canvas) {

        var GL = null;
        var shaderProgram = null;
        var projectionMatrix = null;
        var modelViewMatrix = null;

        function initGL(canvas) {
            try {
                // Try to grab the standard context. If it fails, fallback to experimental.
                GL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
                GL.viewportWidth = canvas.width;
                GL.viewportHeight = canvas.height;
            }
            catch(e) {

            }

            // If we don't have a GL context, give up now
            if (!GL) {
                console.error("Unable to initialize WebGL. Your browser may not support it.");
                GL = null;
            }
        }
        function initShaders() {
            shaderProgram = new ShaderProgram(GL);
            shaderProgram.addShader("shader-vs");
            shaderProgram.addShader("shader-fs");

            shaderProgram.run();

            shaderProgram.addAttribute("vertexPositionAttribute", "aVertexPosition");
            shaderProgram.addAttribute("vertexNormalAttribute", "aVertexNormal");
            shaderProgram.addAttribute("vertexColorAttribute", "aVertexColor");

            shaderProgram.addUniform("pMatrixUniform", "uPMatrix");
            shaderProgram.addUniform("mvMatrixUniform", "uMVMatrix");
            shaderProgram.addUniform("nMatrixUniform", "uNMatrix");

            shaderProgram.addUniform("useLighting", "uUseLighting");
            shaderProgram.addUniform("ambientColor", "uAmbientColor");
            shaderProgram.addUniform("useDirectionalLighting", "uUseDirectionalLighting");
            shaderProgram.addUniform("lightingDirection", "uLightingDirection");
            shaderProgram.addUniform("directionalColor", "uDirectionalColor");
            shaderProgram.addUniform("usePointLighting", "uUsePointLighting");
            shaderProgram.addUniform("pointLightingLocation", "uPointLightingLocation");
            shaderProgram.addUniform("pointLightingSpecularColor", "uPointLightingSpecularColor");
            shaderProgram.addUniform("pointLightingDiffuseColor", "uPointLightingDiffuseColor");
            shaderProgram.addUniform("useSpecularLighting", "uUseSpecularLighting");
            shaderProgram.addUniform("materialShininess", "uMaterialShininess");
        }
        function initMatrices() {
            projectionMatrix = mat4.create();
            modelViewMatrix = mat4.create();
        }

        initGL(canvas);
        initShaders();
        initMatrices();

        this.GL = GL;
        this.shaderProgram = shaderProgram;
        this.projectionMatrix = projectionMatrix;
        this.modelViewMatrix = modelViewMatrix;
    }

    WebGL.prototype = {
        drawScene: function() {
            this.GL.viewport(0, 0, this.GL.viewportWidth, this.GL.viewportHeight);
            this.GL.clear(this.GL.COLOR_BUFFER_BIT | this.GL.DEPTH_BUFFER_BIT);
        },
        draw: function(state) {
            this.drawScene();

            mat4.perspective(this.projectionMatrix, 45, this.GL.viewportWidth / this.GL.viewportHeight, 0.1, 100.0);
            mat4.identity(this.modelViewMatrix);
            mat4.translate(this.modelViewMatrix, this.modelViewMatrix, [state.x, state.y, state.z]);
            mat4.scale(this.modelViewMatrix, this.modelViewMatrix, [6.0, 1.0, 6.0]);

            var cubeData = new Cube();
            var drawableCube = new Drawable(this.GL, cubeData);
            drawableCube.draw(this.shaderProgram, this.projectionMatrix, this.modelViewMatrix, state);
        },
        init: function() {
            if (this.GL) {
                this.GL.clearColor(0.5, 0.5, 0.5, 1.0);                                 // Set clear color to black, fully opaque
                this.GL.enable(this.GL.DEPTH_TEST);                                     // Enable depth testing
                this.GL.depthFunc(this.GL.LEQUAL);                                      // Near things obscure far things
                this.GL.clear(this.GL.COLOR_BUFFER_BIT | this.GL.DEPTH_BUFFER_BIT);     // Clear the color as well as the depth buffer.
            } else {
                throw new Error("WebGL is not initialized.");
            }
        }
    };

    // TODO: Move state to primitive parameters.
    function State() {
        this.x = 0.0;
        this.y = 0.0;
        this.z = 0.0;
        this.useLighting = true;
        this.useDirectionalLighting = true;
        this.usePointLighting = false;
        this.useSpecularLighting = false;

        this.ambientColor = vec3.fromValues(0.2, 0.2, 0.2);

        var lightingDirection = vec3.create();
        vec3.normalize(lightingDirection, vec3.fromValues(1.0, 2.0, 1.0));
        this.lightingDirection = lightingDirection;
        this.directionalColor = vec3.fromValues(1.0, 1.0, 1.0);

        this.pointLightingLocation = vec3.fromValues(0.0, 0.0, 0.0);
        this.pointLightingDiffuseColor = vec3.fromValues(0.9, 0.9, 0.9);

        this.pointLightingSpecularColor = vec3.fromValues(1.0, 1.0, 1.0);
        this.materialShininess = 4;
    }

    function Keyboard(state) {
        this.state = state;
        var pressedKeys = {};
        function handleKeyDown(event) {
            pressedKeys[event.keyCode] = true;
        }
        function handleKeyUp(event) {
            pressedKeys[event.keyCode] = false;
        }
        document.onkeydown = handleKeyDown;
        document.onkeyup = handleKeyUp;
        this.pressedKeys = pressedKeys;
    }

    Keyboard.prototype = {
        handle: function() {
            if (this.pressedKeys[33]) {
                // Page Up
                this.state.z -= 0.05;
            }
            if (this.pressedKeys[34]) {
                // Page Down
                this.state.z += 0.05;
            }
            if (this.pressedKeys[37]) {
                // Page Up
                this.state.x -= 0.05;
            }
            if (this.pressedKeys[39]) {
                // Page Down
                this.state.x += 0.05;
            }
            if (this.pressedKeys[40]) {
                // Page Up
                this.state.y -= 0.05;
            }
            if (this.pressedKeys[38]) {
                // Page Down
                this.state.y += 0.05;
            }
        }
    };

    function Animation(webGl) {
        this.webGl = webGl;
        this.handlers = [];

        window.requestAnimFrame = (function(callback) {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();
    }

    Animation.prototype = {
        addHandler: function(handler) {
            this.handlers.push(handler);
        },
        start: function() {
            function tick() {
                requestAnimFrame(tick);
                animation.handlers.forEach(function(handler) {
                    handler.handle();
                });
                webGL.draw(state);
            }

            tick();
        }
    };

    var state = new State();
    var keyboard = new Keyboard(state);
    var canvas = document.getElementById("gl-canvas");

    var webGL = new WebGL(canvas);
    webGL.init();

    var animation = new Animation(webGL);
    animation.addHandler(keyboard);
    animation.start();
}