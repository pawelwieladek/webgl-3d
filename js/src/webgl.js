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

        var drawableCylinder = new Drawable(this.GL, new Cylinder());
        drawableCylinder.draw(this.shaderProgram, this.projectionMatrix, this.modelViewMatrix, state);
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