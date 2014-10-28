function main() {
    var camera = new Camera();

    var keyboard = new Keyboard();
    keyboard.bind(Keys.UpArrow, camera, camera.moveUp);
    keyboard.bind(Keys.DownArrow, camera, camera.moveDown);
    keyboard.bind(Keys.LeftArrow, camera, camera.moveLeft);
    keyboard.bind(Keys.RightArrow, camera, camera.moveRight);
    keyboard.bind(Keys.S, camera, camera.rotatePitchMinus);
    keyboard.bind(Keys.W, camera, camera.rotatePitchPlus);
    keyboard.bind(Keys.A, camera, camera.rotateYawMinus);
    keyboard.bind(Keys.D, camera, camera.rotateYawPlus);

    var canvas = document.getElementById("gl-canvas");
    var webGL = new WebGL(canvas);

    var scene = new Scene(webGL, camera);

    var r1 = scene.drawableFactory.createDrawable(new Cube(Colors.Red));
    mat4.identity(r1.modelMatrix);
    mat4.translate(r1.modelMatrix, r1.modelMatrix, vec3.fromValues(0.0, 0.0, 3.0));
    scene.add(r1);

    var r2 = scene.drawableFactory.createDrawable(new Cube(Colors.Green));
    mat4.identity(r2.modelMatrix);
    mat4.translate(r2.modelMatrix, r2.modelMatrix, vec3.fromValues(0.0, 0.0, -3.0));
    scene.add(r2);

    var animation = new Animation(scene);
    animation.addHandler(keyboard);
    animation.start();
}