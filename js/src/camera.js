function Camera() {
    this.position = vec3.fromValues(0.0, 0.0, 0.0);
    this.direction = vec3.fromValues(0.0, 0.0, 1.0);
    this.up = vec3.fromValues(0.0, 1.0, 0.0);
    this.step = 0.05;
    this.angle = 5 * (Math.PI / 180);
}

Camera.prototype = {
    moveUp: function() {
        vec3.add(this.position, this.position, vec3.fromValues(0.0, this.step, 0.0));
        vec3.add(this.direction, this.direction, vec3.fromValues(0.0, this.step, 0.0));
    },
    moveDown: function() {
        vec3.add(this.position, this.position, vec3.fromValues(0.0, -this.step, 0.0));
        vec3.add(this.direction, this.direction, vec3.fromValues(0.0, -this.step, 0.0));
    },
    moveLeft: function() {
        vec3.add(this.position, this.position, vec3.fromValues(this.step, 0.0, 0.0));
        vec3.add(this.direction, this.direction, vec3.fromValues(this.step, 0.0, 0.0));
    },
    moveRight: function() {
        vec3.add(this.position, this.position, vec3.fromValues(-this.step, 0.0, 0.0));
        vec3.add(this.direction, this.direction, vec3.fromValues(-this.step, 0.0, 0.0));
    },
    moveFront: function() {
        vec3.add(this.position, this.position, vec3.fromValues(0.0, 0.0, this.step));
        vec3.add(this.direction, this.direction, vec3.fromValues(0.0, 0.0, this.step));
    },
    moveBack: function() {
        vec3.add(this.position, this.position, vec3.fromValues(0.0, 0.0, -this.step));
        vec3.add(this.direction, this.direction, vec3.fromValues(0.0, 0.0, -this.step));
    },
    rotatePitchMinus: function() {
        var rotateMatrix = mat4.create();
        mat4.identity(rotateMatrix);
        mat4.rotateX(rotateMatrix, rotateMatrix, this.angle);
        vec3.transformMat4(this.direction, this.direction, rotateMatrix);
        vec3.transformMat4(this.up, this.up, rotateMatrix);
    },
    rotatePitchPlus: function() {
        var rotateMatrix = mat4.create();
        mat4.identity(rotateMatrix);
        mat4.rotateX(rotateMatrix, rotateMatrix, -this.angle);
        vec3.transformMat4(this.direction, this.direction, rotateMatrix);
        vec3.transformMat4(this.up, this.up, rotateMatrix);
    },
    rotateYawMinus: function() {
        var rotateMatrix = mat4.create();
        mat4.identity(rotateMatrix);
        mat4.rotateY(rotateMatrix, rotateMatrix, this.angle);
        vec3.transformMat4(this.direction, this.direction, rotateMatrix);
        vec3.transformMat4(this.up, this.up, rotateMatrix);
    },
    rotateYawPlus: function() {
        var rotateMatrix = mat4.create();
        mat4.identity(rotateMatrix);
        mat4.rotateY(rotateMatrix, rotateMatrix, -this.angle);
        vec3.transformMat4(this.direction, this.direction, rotateMatrix);
        vec3.transformMat4(this.up, this.up, rotateMatrix);
    },
    rotateRollMinus: function() {
        var rotateMatrix = mat4.create();
        mat4.identity(rotateMatrix);
        mat4.rotateZ(rotateMatrix, rotateMatrix, this.angle);
        vec3.transformMat4(this.direction, this.direction, rotateMatrix);
        vec3.transformMat4(this.up, this.up, rotateMatrix);
    },
    rotateRollPlus: function() {
        var rotateMatrix = mat4.create();
        mat4.identity(rotateMatrix);
        mat4.rotateZ(rotateMatrix, rotateMatrix, -this.angle);
        vec3.transformMat4(this.direction, this.direction, rotateMatrix);
        vec3.transformMat4(this.up, this.up, rotateMatrix);
    }
};