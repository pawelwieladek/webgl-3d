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
    directionalLight: function(direction, ambientColor, diffuseColor) {
        return new DirectionalLight(this.shaderProgram, direction, ambientColor, diffuseColor);
    },
    pointLight: function(position, ambientColor, diffuseColor, constant, linear, exponent) {
        return new PointLight(this.shaderProgram, position, ambientColor, diffuseColor, constant, linear, exponent);
    }
};