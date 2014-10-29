function DirectionalLight(shaderProgram, lightOptions) {
    this.shaderProgram = shaderProgram;
    this.direction = lightOptions.direction;
    this.ambientColor = lightOptions.ambientColor;
    this.diffuseColor = lightOptions.diffuseColor;
}

DirectionalLight.prototype = {
    apply: function() {
        this.shaderProgram.setUniformVector3("directionalLight.direction", this.direction);
        this.shaderProgram.setUniformVector3("directionalLight.diffuseColor", this.diffuseColor);
        this.shaderProgram.setUniformVector3("directionalLight.ambientColor", this.ambientColor);
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
    apply: function() {
        this.shaderProgram.setUniformVector3("pointLight.position", this.position);
        this.shaderProgram.setUniformVector3("pointLight.diffuseColor", this.diffuseColor);
        this.shaderProgram.setUniformVector3("pointLight.ambientColor", this.ambientColor);
        this.shaderProgram.setUniformFloat("pointLight.constantAttenuation", this.constantAttenuation);
        this.shaderProgram.setUniformFloat("pointLight.linearAttenuation", this.linearAttenuation);
        this.shaderProgram.setUniformFloat("pointLight.exponentAttenuation", this.exponentAttenuation);
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
    apply: function() {
        this.shaderProgram.setUniformVector3("spotLight.position", this.position);
        this.shaderProgram.setUniformVector3("spotLight.direction", this.direction);
        this.shaderProgram.setUniformVector3("spotLight.diffuseColor", this.diffuseColor);
        this.shaderProgram.setUniformFloat("spotLight.cosOuterAngle", Math.cos(this.outerAngle * Math.PI / 180));
        this.shaderProgram.setUniformFloat("spotLight.cosInnerAngle", Math.cos(this.innerAngle * Math.PI / 180));
        this.shaderProgram.setUniformFloat("spotLight.range", this.range);
    }
};