function Drawable(GL, primitive) {
    this.GL = GL;
    this.positionBuffer = new VertexBufferObject(GL);
    this.colorBuffer = new VertexBufferObject(GL);
    this.normalBuffer = new VertexBufferObject(GL);
    this.indexBuffer = new IndexBufferObject(GL);

    this.positionBuffer.init(primitive.getVertices().elements, primitive.getVertices().itemSize, primitive.getVertices().numItems);
    this.colorBuffer.init(primitive.getColors().elements, primitive.getColors().itemSize, primitive.getColors().numItems);
    this.normalBuffer.init(primitive.getNormals().elements, primitive.getNormals().itemSize, primitive.getNormals().numItems);
    this.indexBuffer.init(primitive.getIndices().elements, primitive.getIndices().itemSize, primitive.getIndices().numItems);
}

Drawable.prototype = {
    draw: function(shaderProgram, projectionMatrix, modelViewMatrix, state) {
        this.positionBuffer.bind(shaderProgram.getAttribute("vertexPositionAttribute"));
        this.normalBuffer.bind(shaderProgram.getAttribute("vertexNormalAttribute"));
        this.colorBuffer.bind(shaderProgram.getAttribute("vertexColorAttribute"));
        this.indexBuffer.bind();

        var normalMatrix = mat3.create();
        mat3.fromMat4(normalMatrix, modelViewMatrix);
        mat3.invert(normalMatrix, normalMatrix);
        mat3.transpose(normalMatrix, normalMatrix);

        shaderProgram.setUniformMatrix4("pMatrixUniform", projectionMatrix);
        shaderProgram.setUniformMatrix4("mvMatrixUniform", modelViewMatrix);
        shaderProgram.setUniformMatrix3("nMatrixUniform", normalMatrix);

        this.GL.drawElements(this.GL.TRIANGLES, this.indexBuffer.numItems, this.GL.UNSIGNED_SHORT, 0);
    }
};