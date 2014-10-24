// TODO: Move state to primitive parameters.
function State() {
    this.x = 0.0;
    this.y = 0.0;
    this.z = 0.0;
    this.useLighting = true;
    this.useDirectionalLighting = true;
    this.usePointLighting = false;
    this.useSpecularLighting = false;

    this.ambientColor = vec3.fromValues(0.2, 0.2, 0.2);

    var lightingDirection = vec3.create();
    vec3.normalize(lightingDirection, vec3.fromValues(1.0, 2.0, 1.0));
    this.lightingDirection = lightingDirection;
    this.directionalColor = vec3.fromValues(1.0, 1.0, 1.0);

    this.pointLightingLocation = vec3.fromValues(0.0, 0.0, 0.0);
    this.pointLightingDiffuseColor = vec3.fromValues(0.9, 0.9, 0.9);

    this.pointLightingSpecularColor = vec3.fromValues(1.0, 1.0, 1.0);
    this.materialShininess = 4;
}