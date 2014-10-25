function WebGL(canvas) {

    var GL = null;
    var shaderProgram = null;

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
        shaderProgram.addUniform("mMatrixUniform", "uMMatrix");
        shaderProgram.addUniform("vMatrixUniform", "uVMatrix");
        shaderProgram.addUniform("nMatrixUniform", "uNMatrix");
    }

    initGL(canvas);
    initShaders();

    this.GL = GL;
    this.shaderProgram = shaderProgram;
    this.projectionMatrix = mat4.create();
    this.modelMatrix = mat4.create();
    this.viewMatrix = mat4.create();
}

WebGL.prototype = {
    drawScene: function() {
        this.GL.viewport(0, 0, this.GL.viewportWidth, this.GL.viewportHeight);
        this.GL.clear(this.GL.COLOR_BUFFER_BIT | this.GL.DEPTH_BUFFER_BIT);
    },
    draw: function(camera) {
        this.drawScene();

        mat4.perspective(this.projectionMatrix, 45, this.GL.viewportWidth / this.GL.viewportHeight, 0.1, 100.0);

        var drawableFactory = new DrawableFactory(this.GL, this.shaderProgram);
        var drawableCylinder = drawableFactory.createDrawable(new Cylinder());
        mat4.identity(drawableCylinder.modelMatrix);
        mat4.translate(drawableCylinder.modelMatrix, this.modelMatrix, vec3.fromValues(0.0, -0.5, -3.0));
        drawableCylinder.draw(this.projectionMatrix, camera.getViewMatrix());
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