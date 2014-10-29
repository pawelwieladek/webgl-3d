function DirectionalLight(shaderProgram, direction, ambientColor, diffuseColor) {
    this.shaderProgram = shaderProgram;
    this.direction = direction;
    this.ambientColor = ambientColor;
    this.diffuseColor = diffuseColor;
}

DirectionalLight.prototype = {
    apply: function() {
        this.shaderProgram.setUniformVector3("directionalLight.direction", this.direction);
        this.shaderProgram.setUniformVector3("directionalLight.diffuseColor", this.diffuseColor);
        this.shaderProgram.setUniformVector3("directionalLight.ambientColor", this.ambientColor);
    }
};

function PointLight(shaderProgram, position, ambientColor, diffuseColor, constant, linear, exponent) {
    this.shaderProgram = shaderProgram;
    this.position = position;
    this.ambientColor = ambientColor;
    this.diffuseColor = diffuseColor;
    this.constantAttenuation = constant;
    this.linearAttenuation = linear;
    this.exponentAttenuation = exponent;
}

PointLight.prototype = {
    apply: function() {
        this.shaderProgram.setUniformVector3("pointLight.position", this.position);
        this.shaderProgram.setUniformVector3("pointLight.diffuseColor", this.diffuseColor);
        this.shaderProgram.setUniformVector3("pointLight.ambientColor", this.ambientColor);
        this.shaderProgram.setUniformFloat("pointLight.constantAttenuation", this.constantAttenuation);
        this.shaderProgram.setUniformFloat("pointLight.linearAttenuation", this.linearAttenuation);
        this.shaderProgram.setUniformFloat("pointLight.exponentAttenuation", this.exponentAttenuation);
    }
};

function SpotLight(shaderProgram, position, diffuseColor, direction, cosOuter, cosInner, range) {
    this.shaderProgram = shaderProgram;
    this.position = position;
    this.diffuseColor = diffuseColor;
    this.direction = direction;
    this.cosOuter = cosOuter;
    this.cosInner = cosInner;
    this.range = range;
}

SpotLight.prototype = {
    apply: function() {
        this.shaderProgram.setUniformVector3("spotLight.position", this.position);
        this.shaderProgram.setUniformVector3("spotLight.diffuseColor", this.diffuseColor);
        this.shaderProgram.setUniformVector3("spotLight.direction", this.direction);
        this.shaderProgram.setUniformFloat("spotLight.cosOuterAngle", this.cosOuter);
        this.shaderProgram.setUniformFloat("spotLight.cosInnerAngle", this.cosInner);
        this.shaderProgram.setUniformFloat("spotLight.range", this.range);
    }
};