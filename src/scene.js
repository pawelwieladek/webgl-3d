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

        var rectangle = drawableFactory.createDrawable(new Rectangle(Colors.Red));

        mat4.identity(rectangle.modelMatrix);
        mat4.translate(rectangle.modelMatrix, rectangle.modelMatrix, vec3.fromValues(0.0, -0.5, 3.0));
        mat4.scale(rectangle.modelMatrix, rectangle.modelMatrix, vec3.fromValues(6.0, 1.0, 6.0));

        rectangle.draw(this.projectionMatrix, this.camera.getViewMatrix());
    }
};