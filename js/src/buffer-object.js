function VertexBufferObject(GL) {
    this.GL = GL;
    this.buffer = this.GL.createBuffer();
    this.itemSize = null;
    this.numItems = null;
}

VertexBufferObject.prototype = {
    init: function(elements, itemSize, numItems) {
        this.itemSize = itemSize;
        this.numItems = numItems;
        this.GL.bindBuffer(this.GL.ARRAY_BUFFER, this.buffer);
        this.GL.bufferData(this.GL.ARRAY_BUFFER, new Float32Array(elements), this.GL.STATIC_DRAW);
    },
    bind: function(attribute) {
        this.GL.bindBuffer(this.GL.ARRAY_BUFFER, this.buffer);
        this.GL.vertexAttribPointer(attribute, this.itemSize, this.GL.FLOAT, false, 0, 0);
    }
};

function IndexBufferObject(GL) {
    this.GL = GL;
    this.buffer = this.GL.createBuffer();
    this.itemSize = null;
    this.numItems = null;
}

IndexBufferObject.prototype = {
    init: function(elements, itemSize, numItems) {
        this.itemSize = itemSize;
        this.numItems = numItems;
        this.GL.bindBuffer(this.GL.ELEMENT_ARRAY_BUFFER, this.buffer);
        this.GL.bufferData(this.GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(elements), this.GL.STATIC_DRAW);
    },
    bind: function() {
        this.GL.bindBuffer(this.GL.ELEMENT_ARRAY_BUFFER, this.buffer);
    }
};