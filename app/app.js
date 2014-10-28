function main() {

    var canvas = document.getElementById("gl-canvas");
    var webGL = new WebGL(canvas);
    var scene = new Scene(webGL);

    var factory = scene.getFactory();

    var white = factory.material(Colors.White);
    var black = factory.material(Colors.Black);
    var yellow = factory.material(Colors.Yellow);
    var blue = factory.material(Colors.Cyan);

    var hall = factory.drawable(new Cube(), white);
    mat4.identity(hall.modelMatrix);
    mat4.scale(hall.modelMatrix, hall.modelMatrix, vec3.fromValues(8.0, 2.0, 8.0));
    scene.addDrawable(hall);

    var pole1 = factory.drawable(new Cylinder(), black);
    mat4.identity(pole1.modelMatrix);
    mat4.translate(pole1.modelMatrix, pole1.modelMatrix, vec3.fromValues(-2.5, -1.0, 0.0));
    mat4.scale(pole1.modelMatrix, pole1.modelMatrix, vec3.fromValues(0.05, 1, 0.05));
    scene.addDrawable(pole1);

    var pole2 = factory.drawable(new Cylinder(), black);
    mat4.identity(pole2.modelMatrix);
    mat4.translate(pole2.modelMatrix, pole2.modelMatrix, vec3.fromValues(2.5, -1.0, 0.0));
    mat4.scale(pole2.modelMatrix, pole2.modelMatrix, vec3.fromValues(0.05, 1, 0.05));
    scene.addDrawable(pole2);

    var net = factory.drawable(new Rectangle(), yellow);
    mat4.identity(net.modelMatrix);
    mat4.translate(net.modelMatrix, net.modelMatrix, vec3.fromValues(0.0, -0.7, 0.0));
    mat4.scale(net.modelMatrix, net.modelMatrix, vec3.fromValues(2.5, 0.5, 1.0));
    scene.addDrawable(net);

    var stage = factory.drawable(new Rectangle(), blue);
    mat4.identity(stage.modelMatrix);
    mat4.translate(stage.modelMatrix, stage.modelMatrix, vec3.fromValues(0.0, -1.9999, 0.0));
    mat4.rotateX(stage.modelMatrix, stage.modelMatrix, 90 * Math.PI / 180);
    mat4.scale(stage.modelMatrix, stage.modelMatrix, vec3.fromValues(3.5, 6.0, 4.0));
    scene.addDrawable(stage);

    var position = vec3.fromValues(0.5, 1.0, 0.5);
    var ambient = vec3.fromValues(0.3, 0.3, 0.3);
    var diffuse = vec3.fromValues(0.7, 0.7, 0.7);
    var l2 = factory.pointLight(position, ambient, diffuse, 0.5, 0.03, 0.005);
    scene.addLight(l2);

    var camera = scene.getCamera();
    camera.position = vec3.fromValues(0.0, 0.5, 6.0);
    var keyboard = new Keyboard();
    keyboard.bind(Keys.UpArrow, camera, camera.moveUp);
    keyboard.bind(Keys.DownArrow, camera, camera.moveDown);
    keyboard.bind(Keys.LeftArrow, camera, camera.moveLeft);
    keyboard.bind(Keys.RightArrow, camera, camera.moveRight);
    keyboard.bind(Keys.S, camera, camera.rotatePitchMinus);
    keyboard.bind(Keys.W, camera, camera.rotatePitchPlus);
    keyboard.bind(Keys.A, camera, camera.rotateYawMinus);
    keyboard.bind(Keys.D, camera, camera.rotateYawPlus);

    scene.addHandler(keyboard);
    scene.start();
}