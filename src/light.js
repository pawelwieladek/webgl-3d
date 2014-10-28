function DirectionalLight(shaderProgram, direction, diffuseColor) {
    this.shaderProgram = shaderProgram;
    this.direction = direction;
    this.diffuseColor = diffuseColor;
}

DirectionalLight.prototype = {
    apply: function() {
        this.shaderProgram.setUniformVector3("directionalLight.direction", this.direction);
        this.shaderProgram.setUniformVector3("directionalLight.diffuseColor", this.diffuseColor);
    }
};

function PointLight(shaderProgram, position, diffuseColor, constant, linear, exponent) {
    this.shaderProgram = shaderProgram;
    this.position = position;
    this.diffuseColor = diffuseColor;
    this.constantAttenuation = constant;
    this.linearAttenuation = linear;
    this.exponentAttenuation = exponent;
}

PointLight.prototype = {
    apply: function() {
        this.shaderProgram.setUniformVector3("pointLight.position", this.position);
        this.shaderProgram.setUniformVector3("pointLight.diffuseColor", this.diffuseColor);
        this.shaderProgram.setUniformFloat("pointLight.constantAttenuation", this.constantAttenuation);
        this.shaderProgram.setUniformFloat("pointLight.linearAttenuation", this.linearAttenuation);
        this.shaderProgram.setUniformFloat("pointLight.exponentAttenuation", this.exponentAttenuation);
    }
};