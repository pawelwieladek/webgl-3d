function Scene(webGL, camera) {
    this.GL = webGL.getGL();
    this.shaderProgram = webGL.getShaderProgram();
    this.projectionMatrix = mat4.create();
    this.camera = camera;
    this.drawableFactory = new DrawableFactory(this.GL, this.shaderProgram);
    this.drawables = [];
}

Scene.prototype = {
    clear: function() {
        this.GL.viewport(0, 0, this.GL.viewportWidth, this.GL.viewportHeight);
        this.GL.clear(this.GL.COLOR_BUFFER_BIT | this.GL.DEPTH_BUFFER_BIT);
        mat4.perspective(this.projectionMatrix, 45, this.GL.viewportWidth / this.GL.viewportHeight, 0.1, 100.0);
    },
    add: function(drawable) {
        this.drawables.push(drawable);
    },
    draw: function() {
        this.clear();
        var projectionMatrix = this.projectionMatrix;
        var viewMatrix = this.camera.getViewMatrix();
        this.drawables.forEach(function(drawable) {
            drawable.draw(projectionMatrix, viewMatrix);
        });
    }
};