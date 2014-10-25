function Camera() {
    this.position = vec3.fromValues(0.0, 0.0, 0.0);
    this.direction = vec3.fromValues(0.0, 0.0, 1.0);
    this.up = vec3.fromValues(0.0, 1.0, 0.0);
}

Camera.prototype = {

};