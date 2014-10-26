function DrawableFactory(GL, shaderProgram) {
    this.GL = GL;
    this.shaderProgram = shaderProgram;
}

DrawableFactory.prototype = {
    createDrawable: function(primitive) {
        return new Drawable(this.GL, this.shaderProgram, primitive);
    }
};

function Drawable(GL, shaderProgram, primitive) {
    this.GL = GL;
    this.shaderProgram = shaderProgram;
    this.positionBuffer = new VertexBufferObject(GL);
    this.colorBuffer = new VertexBufferObject(GL);
    this.normalBuffer = new VertexBufferObject(GL);
    this.indexBuffer = new IndexBufferObject(GL);
    this.modelMatrix = mat4.create();

    // init
    mat4.identity(this.modelMatrix);
    this.positionBuffer.init(primitive.vertices.elements, primitive.vertices.itemSize, primitive.vertices.numItems);
    this.colorBuffer.init(primitive.colors.elements, primitive.colors.itemSize, primitive.colors.numItems);
    this.normalBuffer.init(primitive.normals.elements, primitive.normals.itemSize, primitive.normals.numItems);
    this.indexBuffer.init(primitive.indices.elements, primitive.indices.itemSize, primitive.indices.numItems);
}

Drawable.prototype = {
    draw: function(projectionMatrix, viewMatrix) {
        this.positionBuffer.bind(this.shaderProgram.getAttribute("vertexPositionAttribute"));
        this.normalBuffer.bind(this.shaderProgram.getAttribute("vertexNormalAttribute"));
        this.colorBuffer.bind(this.shaderProgram.getAttribute("vertexColorAttribute"));
        this.indexBuffer.bind();

        var normalMatrix = mat3.create();
        var modelViewMatrix = mat4.create();
        mat4.multiply(modelViewMatrix, this.modelMatrix, viewMatrix);
        mat3.fromMat4(normalMatrix, modelViewMatrix);
        mat3.invert(normalMatrix, normalMatrix);
        mat3.transpose(normalMatrix, normalMatrix);

        this.shaderProgram.setUniformMatrix4("projectionMatrixUniform", projectionMatrix);
        this.shaderProgram.setUniformMatrix4("viewMatrixUniform", viewMatrix);
        this.shaderProgram.setUniformMatrix4("modelMatrixUniform", this.modelMatrix);
        this.shaderProgram.setUniformMatrix3("normalMatrixUniform", normalMatrix);

        this.GL.drawElements(this.GL.TRIANGLES, this.indexBuffer.numItems, this.GL.UNSIGNED_SHORT, 0);
    }
};