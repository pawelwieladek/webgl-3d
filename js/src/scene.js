function Scene(webGL, camera) {
    this.GL = webGL.getGL();
    this.shaderProgram = webGL.getShaderProgram();
    this.projectionMatrix = mat4.create();
    this.camera = camera;
}

Scene.prototype = {
    clear: function() {
        this.GL.viewport(0, 0, this.GL.viewportWidth, this.GL.viewportHeight);
        this.GL.clear(this.GL.COLOR_BUFFER_BIT | this.GL.DEPTH_BUFFER_BIT);
        mat4.perspective(this.projectionMatrix, 45, this.GL.viewportWidth / this.GL.viewportHeight, 0.1, 100.0);
    },
    draw: function() {
        this.clear();

        var drawableFactory = new DrawableFactory(this.GL, this.shaderProgram);

        var drawableCylinder = drawableFactory.createDrawable(new Cylinder());

        mat4.identity(drawableCylinder.modelMatrix);
        mat4.translate(drawableCylinder.modelMatrix, drawableCylinder.modelMatrix, vec3.fromValues(0.0, -0.5, -3.0));

        drawableCylinder.draw(this.projectionMatrix, this.camera.getViewMatrix());
    }
};