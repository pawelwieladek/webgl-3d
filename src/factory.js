function Factory(GL, shaderProgram) {
    this.GL = GL;
    this.shaderProgram = shaderProgram;
}

Factory.prototype = {
    drawable: function(primitive, material) {
        return new Drawable(this.GL, this.shaderProgram, primitive, material);
    },
    material: function(color) {
        return new Material(this.shaderProgram, color);
    },
    directionalLight: function(lightOptions) {
        return new DirectionalLight(this.shaderProgram, lightOptions);
    },
    pointLight: function(lightOptions) {
        return new PointLight(this.shaderProgram, lightOptions);
    },
    spotLight: function(lightOptions) {
        return new SpotLight(this.shaderProgram, lightOptions);
    }
};