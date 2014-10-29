function Scene(webGL, camera) {
    this.GL = webGL.getGL();
    this.shaderProgram = webGL.getShaderProgram();
    this.projectionMatrix = mat4.create();
    this.camera = new Camera();
    this.factory = new Factory(this.GL, this.shaderProgram);
    this.drawables = [];
    this.lights = {
        directional: [],
        point: [],
        spot: []
    };
    this.handlers = [];

    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
}

Scene.prototype = {
    getCamera: function() {
        return this.camera;
    },
    getFactory: function() {
        return this.factory;
    },
    clear: function() {
        this.GL.viewport(0, 0, this.GL.viewportWidth, this.GL.viewportHeight);
        this.GL.clear(this.GL.COLOR_BUFFER_BIT | this.GL.DEPTH_BUFFER_BIT);
        mat4.perspective(this.projectionMatrix, 45, this.GL.viewportWidth / this.GL.viewportHeight, 0.1, 100.0);
    },
    addDrawable: function(drawable) {
        this.drawables.push(drawable);
    },
    addDirectionalLight: function(light) {
        this.lights.directional.push(light);
    },
    addPointLight: function(light) {
        this.lights.point.push(light);
    },
    addSpotLight: function(light) {
        this.lights.spot.push(light);
    },
    draw: function() {
        this.clear();
        this.lights.directional.forEach(function(light, index) {
            light.apply(index);
        });
        this.lights.point.forEach(function(light, index) {
            light.apply(index);
        });
        this.lights.spot.forEach(function(light, index) {
            light.apply(index);
        });

        this.shaderProgram.setUniformInteger("directionalLightsCount", this.lights.directional.length);
        this.shaderProgram.setUniformInteger("pointLightsCount", this.lights.point.length);
        this.shaderProgram.setUniformInteger("spotLightsCount", this.lights.spot.length);

        var projectionMatrix = this.projectionMatrix;
        var viewMatrix = this.camera.getViewMatrix();
        this.drawables.forEach(function(drawable) {
            drawable.draw(projectionMatrix, viewMatrix);
        });
    },
    addHandler: function(handler) {
        this.handlers.push(handler);
    },
    start: function() {
        var self = this;
        function tick() {
            requestAnimFrame(tick);
            self.handlers.forEach(function(handler) {
                handler.handle();
            });
            self.draw();
        }
        tick();
    }
};