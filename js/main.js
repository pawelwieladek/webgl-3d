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
        setUniformMatrix: function(key, matrix) {
            this.GL.uniformMatrix4fv(this.uniforms[key], false, matrix);
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
        this.colors = null;
        this.indices = null;
    }

    Primitive.prototype = {
        getVertices: function() {
            return this.vertices;
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
        this.colors = {
            elements: [
                1.0, 0.0, 0.0, 1.0, // Front face
                1.0, 0.0, 0.0, 1.0, // Front face
                1.0, 0.0, 0.0, 1.0, // Front face
                1.0, 0.0, 0.0, 1.0, // Front face
                1.0, 1.0, 0.0, 1.0, // Back face
                1.0, 1.0, 0.0, 1.0, // Back face
                1.0, 1.0, 0.0, 1.0, // Back face
                1.0, 1.0, 0.0, 1.0, // Back face
                0.0, 1.0, 0.0, 1.0, // Top face
                0.0, 1.0, 0.0, 1.0, // Top face
                0.0, 1.0, 0.0, 1.0, // Top face
                0.0, 1.0, 0.0, 1.0, // Top face
                1.0, 0.5, 0.5, 1.0, // Bottom face
                1.0, 0.5, 0.5, 1.0, // Bottom face
                1.0, 0.5, 0.5, 1.0, // Bottom face
                1.0, 0.5, 0.5, 1.0, // Bottom face
                1.0, 0.0, 1.0, 1.0, // Right face
                1.0, 0.0, 1.0, 1.0, // Right face
                1.0, 0.0, 1.0, 1.0, // Right face
                1.0, 0.0, 1.0, 1.0, // Right face
                0.0, 0.0, 1.0, 1.0,  // Left face
                0.0, 0.0, 1.0, 1.0,  // Left face
                0.0, 0.0, 1.0, 1.0,  // Left face
                0.0, 0.0, 1.0, 1.0  // Left face
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
        this.indexBuffer = new IndexBufferObject(GL);

        this.positionBuffer.init(primitive.getVertices().elements, primitive.getVertices().itemSize, primitive.getVertices().numItems);
        this.colorBuffer.init(primitive.getColors().elements, primitive.getColors().itemSize, primitive.getColors().numItems);
        this.indexBuffer.init(primitive.getIndices().elements, primitive.getIndices().itemSize, primitive.getIndices().numItems);
    }

    Drawable.prototype = {
        draw: function(shaderProgram, projectionMatrix, modelViewMatrix) {
            this.positionBuffer.bind(shaderProgram.getAttribute("vertexPositionAttribute"));
            this.colorBuffer.bind(shaderProgram.getAttribute("vertexColorAttribute"));
            this.indexBuffer.bind();

            shaderProgram.setUniformMatrix("pMatrixUniform", projectionMatrix);
            shaderProgram.setUniformMatrix("mvMatrixUniform", modelViewMatrix);

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
            shaderProgram.addAttribute("vertexColorAttribute", "aVertexColor");

            shaderProgram.addUniform("pMatrixUniform", "uPMatrix");
            shaderProgram.addUniform("mvMatrixUniform", "uMVMatrix");
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
        draw: function(state) {
            this.drawScene();

            mat4.perspective(this.projectionMatrix, 45, this.GL.viewportWidth / this.GL.viewportHeight, 0.1, 100.0);
            mat4.identity(this.modelViewMatrix);
            mat4.translate(this.modelViewMatrix, this.modelViewMatrix, [state.x, state.y, state.z]);
            var cubeData = new Cube();
            var drawableCube = new Drawable(this.GL, cubeData);
            drawableCube.draw(this.shaderProgram, this.projectionMatrix, this.modelViewMatrix);
        },
        drawScene: function() {
            this.GL.viewport(0, 0, this.GL.viewportWidth, this.GL.viewportHeight);
            this.GL.clear(this.GL.COLOR_BUFFER_BIT | this.GL.DEPTH_BUFFER_BIT);
        },
        init: function() {
            if (this.GL) {
                this.GL.clearColor(0.0, 0.0, 0.0, 1.0);                                 // Set clear color to black, fully opaque
                this.GL.enable(this.GL.DEPTH_TEST);                                     // Enable depth testing
                this.GL.depthFunc(this.GL.LEQUAL);                                      // Near things obscure far things
                this.GL.clear(this.GL.COLOR_BUFFER_BIT | this.GL.DEPTH_BUFFER_BIT);     // Clear the color as well as the depth buffer.
            } else {
                throw new Error("WebGL is not initialized.");
            }
        }
    };

    function State() {
        this.x = 0.0;
        this.y = 0.0;
        this.z = 0.0;
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