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
    pole1.translate(vec3.fromValues(-2.5, -1.0, 0.0));
    pole1.scale(vec3.fromValues(0.05, 1, 0.05));
    scene.addDrawable(pole1);

    var pole2 = factory.drawable(new Cylinder(), black);
    pole2.translate(vec3.fromValues(2.5, -1.0, 0.0));
    pole2.scale(vec3.fromValues(0.05, 1, 0.05));
    scene.addDrawable(pole2);

    var net = factory.drawable(new Rectangle(), yellow);
    net.translate(vec3.fromValues(0.0, -0.7, 0.0));
    net.scale(vec3.fromValues(2.5, 0.5, 1.0));
    scene.addDrawable(net);

    var pointLightPosition = vec3.fromValues(0.5, 1.0, 0.5);
    var pointLightAmbient = vec3.fromValues(0.1, 0.1, 0.1);
    var pointLightDiffuse = vec3.fromValues(0.3, 0.3, 0.3);

    var pointLight = factory.pointLight(pointLightPosition, pointLightAmbient, pointLightDiffuse, 0.5, 0.03, 0.005);
    scene.addLight(pointLight);

    var spotLight = factory.spotLight(vec3.fromValues(0.0, 0.0, 5.0), vec3.fromValues(0.7, 0.7, 0.7), vec3.fromValues(0.0, 0.0, -1.0), Math.cos(15 * Math.PI / 180), Math.cos(5 * Math.PI / 180), 30.0);
    scene.addLight(spotLight);

    var camera = scene.getCamera();
    camera.setPosition(vec3.fromValues(0.0, -1.0, 6.0));

    var keyboard = new Keyboard();
    keyboard.bind(Keys.UpArrow, camera, camera.moveForward);
    keyboard.bind(Keys.DownArrow, camera, camera.moveBackward);
    keyboard.bind(Keys.LeftArrow, camera, camera.moveLeft);
    keyboard.bind(Keys.RightArrow, camera, camera.moveRight);
    keyboard.bind(Keys.PageUp, camera, camera.moveUp);
    keyboard.bind(Keys.PageDown, camera, camera.moveDown);
    keyboard.bind(Keys.S, camera, camera.rotatePitchMinus);
    keyboard.bind(Keys.W, camera, camera.rotatePitchPlus);
    keyboard.bind(Keys.A, camera, camera.rotateYawMinus);
    keyboard.bind(Keys.D, camera, camera.rotateYawPlus);

    scene.addHandler(keyboard);
    scene.start();
}