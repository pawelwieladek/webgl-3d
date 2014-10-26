function Primitive() {
    this.vertices = null;
    this.normals = null;
    this.colors = null;
    this.indices = null;

    this.fill = function(color) {
        var colors = {
            elements: [],
            itemSize: 4,
            numItems: this.vertices.numItems
        };

        for (var i = 0; i < colors.numItems; i++) {
            colors.elements = colors.elements.concat(color);
        }

        this.colors = colors;
    };
}

Primitive.prototype = {

};