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
    directionalLight: function(direction, diffuse) {
        return new DirectionalLight(this.shaderProgram, direction, diffuse);
    },
    pointLight: function(position, diffuse, constant, linear, exponent) {
        return new PointLight(this.shaderProgram, position, diffuse, constant, linear, exponent);
    }
};