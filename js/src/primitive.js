function Primitive() {
    this.vertices = null;
    this.normals = null;
    this.colors = null;
    this.indices = null;
}

Primitive.prototype = {
    getVertices: function() {
        return this.vertices;
    },
    getNormals: function() {
        return this.normals;
    },
    getColors: function() {
        return this.colors;
    },
    getIndices: function() {
        return this.indices;
    }
};