function Drawable(GL, shaderProgram, primitive, material) {
    this.GL = GL;
    this.shaderProgram = shaderProgram;
    this.primitive = primitive;
    this.material = material;
    this.positionBuffer = new VertexBufferObject(GL);
    this.normalBuffer = new VertexBufferObject(GL);
    this.indexBuffer = new IndexBufferObject(GL);
    this.modelMatrix = mat4.create();

    mat4.identity(this.modelMatrix);
    this.positionBuffer.init(primitive.vertices.elements, primitive.vertices.itemSize, primitive.vertices.numItems);
    this.normalBuffer.init(primitive.normals.elements, primitive.normals.itemSize, primitive.normals.numItems);
    this.indexBuffer.init(primitive.indices.elements, primitive.indices.itemSize, primitive.indices.numItems);
}

Drawable.prototype = {
    translate: function(vector) {
        mat4.translate(this.modelMatrix, this.modelMatrix, vector);
    },
    scale: function(scale) {
        mat4.scale(this.modelMatrix, this.modelMatrix, scale);
    },
    rotateX: function(angle) {
        mat4.translate(this.modelMatrix, this.modelMatrix, angle);
    },
    rotateY: function(angle) {
        mat4.translate(this.modelMatrix, this.modelMatrix, angle);
    },
    rotateZ: function(angle) {
        mat4.translate(this.modelMatrix, this.modelMatrix, angle);
    },
    draw: function(projectionMatrix, viewMatrix) {
        this.positionBuffer.bind(this.shaderProgram.getAttribute("vertexPosition"));
        this.normalBuffer.bind(this.shaderProgram.getAttribute("vertexNormal"));
        this.indexBuffer.bind();

        var normalMatrix = mat3.create();
        mat3.fromMat4(normalMatrix, this.modelMatrix);
        mat3.invert(normalMatrix, normalMatrix);
        mat3.transpose(normalMatrix, normalMatrix);

        this.shaderProgram.setUniformMatrix4("projectionMatrix", projectionMatrix);
        this.shaderProgram.setUniformMatrix4("viewMatrix", viewMatrix);
        this.shaderProgram.setUniformMatrix4("modelMatrix", this.modelMatrix);
        this.shaderProgram.setUniformMatrix3("normalMatrix", normalMatrix);

        this.material.apply();

        this.GL.drawElements(this.GL.TRIANGLES, this.indexBuffer.numItems, this.GL.UNSIGNED_SHORT, 0);
    }
};