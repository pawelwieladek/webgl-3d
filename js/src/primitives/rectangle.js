function Rectangle() {
    Primitive.call(this);
    this.vertices = {
        elements: [
            -1.0, -1.0, 0.0,
            -1.0, 1.0, 0.0,
            1.0, 1.0, 0.0,
            -1.0, -1.0, 0.0,
            1.0, 1.0, 0.0,
            1.0, -1.0, 0.0
        ],
        itemSize: 3,
        numItems: 6
    };
    this.normals = {
        elements: [
            // Front face
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0
        ],
        itemSize: 3,
        numItems: 6
    };
    this.colors = {
        elements: [
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0
        ],
        itemSize: 4,
        numItems: 6
    };
    this.indices = {
        elements: [
            0, 1, 2, 3, 4, 5
        ],
        itemSize: 1,
        numItems: 6
    };
}

Cube.prototype = Object.create(Primitive.prototype);