function Scene(webGL, camera) {
    this.GL = webGL.getGL();
    this.shaderProgram = webGL.getShaderProgram();
    this.projectionMatrix = mat4.create();
    this.camera = new Camera();
    this.factory = new Factory(this.GL, this.shaderProgram);
    this.drawables = [];
    this.lights = [];
}

Scene.prototype = {
    getCamera: function() {
        return this.camera;
    },
    clear: function() {
        this.GL.viewport(0, 0, this.GL.viewportWidth, this.GL.viewportHeight);
        this.GL.clear(this.GL.COLOR_BUFFER_BIT | this.GL.DEPTH_BUFFER_BIT);
        mat4.perspective(this.projectionMatrix, 45, this.GL.viewportWidth / this.GL.viewportHeight, 0.1, 100.0);
    },
    addDrawable: function(drawable) {
        this.drawables.push(drawable);
    },
    addLight: function(light) {
        this.lights.push(light);
    },
    draw: function() {
        this.clear();
        this.lights.forEach(function(light) {
            light.apply();
        });
        var projectionMatrix = this.projectionMatrix;
        var viewMatrix = this.camera.getViewMatrix();
        this.drawables.forEach(function(drawable) {
            drawable.draw(projectionMatrix, viewMatrix);
        });
    }
};