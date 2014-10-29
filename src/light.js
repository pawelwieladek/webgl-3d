function DirectionalLight(shaderProgram, lightOptions) {
    this.shaderProgram = shaderProgram;
    this.direction = lightOptions.direction;
    this.ambientColor = lightOptions.ambientColor;
    this.diffuseColor = lightOptions.diffuseColor;
}

DirectionalLight.prototype = {
    apply: function(index) {
        this.shaderProgram.setUniformVector3("directionalLights[" + index + "].direction", this.direction);
        this.shaderProgram.setUniformVector3("directionalLights[" + index + "].diffuseColor", this.diffuseColor);
        this.shaderProgram.setUniformVector3("directionalLights[" + index + "].ambientColor", this.ambientColor);
    }
};

function PointLight(shaderProgram, lightOptions) {
    this.shaderProgram = shaderProgram;
    this.position = lightOptions.position;
    this.ambientColor = lightOptions.ambientColor;
    this.diffuseColor = lightOptions.diffuseColor;
    this.constantAttenuation = lightOptions.constantAttenuation;
    this.linearAttenuation = lightOptions.linearAttenuation;
    this.exponentAttenuation = lightOptions.exponentAttenuation;
}

PointLight.prototype = {
    apply: function(index) {
        this.shaderProgram.setUniformVector3("pointLights[" + index + "].position", this.position);
        this.shaderProgram.setUniformVector3("pointLights[" + index + "].diffuseColor", this.diffuseColor);
        this.shaderProgram.setUniformVector3("pointLights[" + index + "].ambientColor", this.ambientColor);
        this.shaderProgram.setUniformFloat("pointLights[" + index + "].constantAttenuation", this.constantAttenuation);
        this.shaderProgram.setUniformFloat("pointLights[" + index + "].linearAttenuation", this.linearAttenuation);
        this.shaderProgram.setUniformFloat("pointLights[" + index + "].exponentAttenuation", this.exponentAttenuation);
    }
};

function SpotLight(shaderProgram, lightOptions) {
    this.shaderProgram = shaderProgram;
    this.position = lightOptions.position;
    this.direction = lightOptions.direction;
    this.diffuseColor = lightOptions.diffuseColor;
    this.outerAngle = lightOptions.outerAngle;
    this.innerAngle = lightOptions.innerAngle;
    this.range = lightOptions.range;
}

SpotLight.prototype = {
    apply: function(index) {
        this.shaderProgram.setUniformVector3("spotLights[" + index + "].position", this.position);
        this.shaderProgram.setUniformVector3("spotLights[" + index + "].direction", this.direction);
        this.shaderProgram.setUniformVector3("spotLights[" + index + "].diffuseColor", this.diffuseColor);
        this.shaderProgram.setUniformFloat("spotLights[" + index + "].cosOuterAngle", Math.cos(this.outerAngle * Math.PI / 180));
        this.shaderProgram.setUniformFloat("spotLights[" + index + "].cosInnerAngle", Math.cos(this.innerAngle * Math.PI / 180));
        this.shaderProgram.setUniformFloat("spotLights[" + index + "].range", this.range);
    }
};