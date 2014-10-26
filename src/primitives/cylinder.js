function Cylinder(color) {
    Primitive.call(this, color);
    var vertices = {
        elements: [],
        itemSize: 3,
        numItems: 0
    };
    var normals = {
        elements: [],
        itemSize: 3,
        numItems: 0
    };
    var colors = {
        elements: [],
        itemSize: 4,
        numItems: 0
    };
    var indices = {
        elements: [],
        itemSize: 1,
        numItems: 0
    };

    function cos(degrees) {
        return Math.cos(degrees * (Math.PI / 180));
    }

    function sin(degrees) {
        return Math.sin(degrees * (Math.PI / 180));
    }

    var index = 0;
    var angleStep = 10;
    function drawBasis(y, normal) {
        for (var i = 0; i < 360; i += angleStep) {
            vertices.elements = vertices.elements.concat([0.0, y, 0.0]);
            vertices.elements = vertices.elements.concat([cos(i), y, sin(i)]);
            vertices.elements = vertices.elements.concat([cos(i + angleStep), y, sin(i + angleStep)]);
            vertices.numItems += 3;

            normals.elements = normals.elements.concat([0.0, normal, 0.0]);
            normals.elements = normals.elements.concat([0.0, normal, 0.0]);
            normals.elements = normals.elements.concat([0.0, normal, 0.0]);
            normals.numItems += 3;

            for (var k = 0; k < 3; k++) {
                indices.elements.push(index++);
            }
            indices.numItems += 3;
        }
    }

    function drawSide(height, normal) {
        for (var i = 0; i < 360; i++) {
            vertices.elements = vertices.elements.concat([cos(i), 0, sin(i)]);
            vertices.elements = vertices.elements.concat([cos(i + angleStep), 0, sin(i + angleStep)]);
            vertices.elements = vertices.elements.concat([cos(i + angleStep), height, sin(i + angleStep)]);
            vertices.elements = vertices.elements.concat([cos(i + angleStep), height, sin(i + angleStep)]);
            vertices.elements = vertices.elements.concat([cos(i), height, sin(i)]);
            vertices.elements = vertices.elements.concat([cos(i), 0, sin(i)]);
            vertices.numItems += 6;

            normals.elements = normals.elements.concat([normal * cos(i), 0, normal * sin(i)]);
            normals.elements = normals.elements.concat([normal * cos(i + angleStep), 0, normal * sin(i + angleStep)]);
            normals.elements = normals.elements.concat([normal * cos(i + angleStep), 0, normal * sin(i + angleStep)]);
            normals.elements = normals.elements.concat([normal * cos(i + angleStep), 0, normal * sin(i + angleStep)]);
            normals.elements = normals.elements.concat([normal * cos(i), 0, normal * sin(i)]);
            normals.elements = normals.elements.concat([normal * cos(i), 0, normal * sin(i)]);
            normals.numItems += 6;

            for (var k = 0; k < 6; k++) {
                indices.elements.push(index++);
            }
            indices.numItems += 6;
        }
    }
    var lower = 0.0;
    var upper = 1.0;
    var normal = 1.0;

    drawBasis(lower, -normal);
    drawBasis(upper, normal);
    drawSide(upper, normal);

    this.vertices = vertices;
    this.normals = normals;
    this.colors = colors;
    this.indices = indices;


    if (typeof color === "undefined" || color === null) {
        color = Colors.Black;
    }
    this.fill(color);
}

Cylinder.prototype = Object.create(Primitive.prototype);