function main() {

    var canvas = document.getElementById("gl-canvas");
    var webGL = new WebGL(canvas);
    var scene = new Scene(webGL);

    var factory = scene.getFactory();

    var m1 = factory.material(Colors.Blue);

    var hall = factory.drawable(new Cube(), m1);
    mat4.identity(hall.modelMatrix);
    mat4.scale(hall.modelMatrix, hall.modelMatrix, vec3.fromValues(10.0, 1.0, 10.0));
    scene.addDrawable(hall);

    var diffuse = vec3.fromValues(0.8, 0.8, 0.8);
    var l1 = factory.directionalLight(vec3.fromValues(1.0, 0.0, 0.0), diffuse);
    scene.addLight(l1);

    var l2 = factory.pointLight(vec3.fromValues(0.0, 0.0, 0.0), diffuse, 0.5, 0.01, 0.0);
    scene.addLight(l2);

    var camera = scene.getCamera();
    camera.position = vec3.fromValues(0.0, 0.0, 5.0);
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