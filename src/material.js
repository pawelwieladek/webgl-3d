function Material(shaderProgram, color) {
    this.shaderProgram = shaderProgram;
    this.color = color;
}

Material.prototype = {
    apply: function() {
        this.shaderProgram.setUniformVector3("material.color", this.color);
    }
};
