function Camera() {
    this.viewMatrix = mat4.create();
    this.position = vec3.fromValues(0.0, 0.0, 0.0);
    this.direction = vec3.fromValues(0.0, 0.0, -1.0);
    this.up = vec3.fromValues(0.0, 1.0, 0.0);
    this.translateStep = 0.05;
    this.rotateStep = Math.PI / 180;
    this.pitchAngle = 0.0;
    this.yawAngle = 0.0;
    this.axisX = vec3.fromValues(1.0, 0.0, 0.0);
    this.axisY = vec3.fromValues(0.0, 1.0, 0.0);
    this.axisZ = vec3.fromValues(0.0, 0.0, 1.0);
}

Camera.prototype = {
    debug: function() {
        $("#position").text(vec3.str(this.position));
        $("#direction").text(vec3.str(this.direction));
        $("#up").text(vec3.str(this.up));
        $("#viewMatrix").text(mat4.str(this.viewMatrix));
        $("#pitchAngle").text(this.pitchAngle);
        $("#yawAngle").text(this.yawAngle);
    },
    getViewMatrix: function() {
        var baseDirection = vec3.fromValues(0.0, 0.0, -1.0);
        var baseUp = vec3.fromValues(0.0, 1.0, 0.0);
        var rotateMatrix = mat4.create();
        mat4.identity(rotateMatrix);
        mat4.rotateX(rotateMatrix, rotateMatrix, this.pitchAngle);
        mat4.rotateY(rotateMatrix, rotateMatrix, this.yawAngle);
        vec3.transformMat4(this.direction, baseDirection, rotateMatrix);
        vec3.transformMat4(this.up, baseUp, rotateMatrix);
        vec3.add(this.direction, this.position, this.direction);

        mat4.identity(this.viewMatrix);
        mat4.lookAt(this.viewMatrix, this.position, this.direction, this.up);
        this.debug();
        return this.viewMatrix;
    },
    moveUp: function() {
        vec3.add(this.position, this.position, vec3.fromValues(0.0, this.translateStep, 0.0));
    },
    moveDown: function() {
        vec3.add(this.position, this.position, vec3.fromValues(0.0, -this.translateStep, 0.0));
    },
    moveLeft: function() {
        vec3.add(this.position, this.position, vec3.fromValues(this.translateStep, 0.0, 0.0));
    },
    moveRight: function() {
        vec3.add(this.position, this.position, vec3.fromValues(-this.translateStep, 0.0, 0.0));
    },
    moveFront: function() {
        vec3.add(this.position, this.position, vec3.fromValues(0.0, 0.0, this.translateStep));
    },
    moveBack: function() {
        vec3.add(this.position, this.position, vec3.fromValues(0.0, 0.0, -this.translateStep));
    },
    rotatePitchMinus: function() {
        this.pitchAngle -= this.rotateStep;
    },
    rotatePitchPlus: function() {
        this.pitchAngle += this.rotateStep;
    },
    rotateYawMinus: function() {
        this.yawAngle += this.rotateStep;
    },
    rotateYawPlus: function() {
        this.yawAngle -= this.rotateStep;
    }
};