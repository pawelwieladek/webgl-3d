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

        shaderProgram.addAttribute("vertexPositionAttribute", "vertexPosition");
        shaderProgram.addAttribute("vertexNormalAttribute", "vertexNormal");

        shaderProgram.addUniform("projectionMatrixUniform", "projectionMatrix");
        shaderProgram.addUniform("modelMatrixUniform", "modelMatrix");
        shaderProgram.addUniform("viewMatrixUniform", "viewMatrix");
        shaderProgram.addUniform("normalMatrixUniform", "normalMatrix");

        shaderProgram.addUniform("material.color", "material.color");

        shaderProgram.addUniform("directionalLight.direction", "directionalLight.direction");
        shaderProgram.addUniform("directionalLight.diffuseColor", "directionalLight.diffuseColor");

        shaderProgram.addUniform("pointLight.position", "pointLight.position");
        shaderProgram.addUniform("pointLight.diffuseColor", "pointLight.diffuseColor");
        shaderProgram.addUniform("pointLight.constantAttenuation", "pointLight.constantAttenuation");
        shaderProgram.addUniform("pointLight.linearAttenuation", "pointLight.linearAttenuation");
        shaderProgram.addUniform("pointLight.exponentAttenuation", "pointLight.exponentAttenuation");
    }

    initGL(canvas);
    initShaders();

    this.GL = GL;
    this.shaderProgram = shaderProgram;

    if (this.GL) {
        this.GL.clearColor(0.5, 0.5, 0.5, 1.0);                                 // Set clear color to black, fully opaque
        this.GL.enable(this.GL.DEPTH_TEST);                                     // Enable depth testing
        this.GL.depthFunc(this.GL.LEQUAL);                                      // Near things obscure far things
        this.GL.clear(this.GL.COLOR_BUFFER_BIT | this.GL.DEPTH_BUFFER_BIT);     // Clear the color as well as the depth buffer.
    } else {
        throw new Error("WebGL is not initialized.");
    }
}

WebGL.prototype = {
    getGL: function() {
        return this.GL;
    },
    getShaderProgram: function() {
        return this.shaderProgram;
    }
};