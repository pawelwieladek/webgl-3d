function main() {

    var canvas = document.getElementById("gl-canvas");
    var webGL = new WebGL(canvas);
    var scene = new Scene(webGL);

    var m1 = scene.factory.material(Colors.Blue);

    var r1 = scene.factory.drawable(new Cube(), m1);
    mat4.identity(r1.modelMatrix);
    mat4.translate(r1.modelMatrix, r1.modelMatrix, vec3.fromValues(0.0, 0.0, 3.0));
    scene.addDrawable(r1);

    var r2 = scene.factory.drawable(new Cylinder(), m1);
    mat4.identity(r2.modelMatrix);
    mat4.translate(r2.modelMatrix, r2.modelMatrix, vec3.fromValues(0.0, 0.0, -3.0));
    scene.addDrawable(r2);

    var direction = vec3.fromValues(1.0, 0.0, 0.0);
    var diffuse = vec3.fromValues(0.8, 0.8, 0.8);

    var l1 = scene.factory.directionalLight(direction, diffuse);
    scene.addLight(l1);

    var position = vec3.fromValues(1.0, 0.0, 0.0);
    var l2 = scene.factory.pointLight(position, diffuse, 0.5, 0.5, 0.0);
    scene.addLight(l2);

    var camera = scene.getCamera();
    var keyboard = new Keyboard();
    keyboard.bind(Keys.UpArrow, camera, camera.moveUp);
    keyboard.bind(Keys.DownArrow, camera, camera.moveDown);
    keyboard.bind(Keys.LeftArrow, camera, camera.moveLeft);
    keyboard.bind(Keys.RightArrow, camera, camera.moveRight);
    keyboard.bind(Keys.S, camera, camera.rotatePitchMinus);
    keyboard.bind(Keys.W, camera, camera.rotatePitchPlus);
    keyboard.bind(Keys.A, camera, camera.rotateYawMinus);
    keyboard.bind(Keys.D, camera, camera.rotateYawPlus);

    var animation = new Animation(scene);
    animation.addHandler(keyboard);
    animation.start();
}