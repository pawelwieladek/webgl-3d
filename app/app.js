function main() {
    var camera = new Camera();

    var keyboard = new Keyboard();
    keyboard.bind(Keys.UpArrow, camera, camera.moveUp);
    keyboard.bind(Keys.DownArrow, camera, camera.moveDown);
    keyboard.bind(Keys.LeftArrow, camera, camera.moveLeft);
    keyboard.bind(Keys.RightArrow, camera, camera.moveRight);
    keyboard.bind(Keys.PageUp, camera, camera.moveFront);
    keyboard.bind(Keys.PageDown, camera, camera.moveBack);
    keyboard.bind(Keys.W, camera, camera.rotatePitchMinus);
    keyboard.bind(Keys.S, camera, camera.rotatePitchPlus);
    keyboard.bind(Keys.A, camera, camera.rotateYawMinus);
    keyboard.bind(Keys.D, camera, camera.rotateYawPlus);
    keyboard.bind(Keys.Q, camera, camera.rotateRollMinus);
    keyboard.bind(Keys.E, camera, camera.rotateRollPlus);

    var canvas = document.getElementById("gl-canvas");
    var webGL = new WebGL(canvas);

    var scene = new Scene(webGL, camera);

    var rectangle = scene.drawableFactory.createDrawable(new Cube(Colors.Red));

    mat4.identity(rectangle.modelMatrix);
    mat4.translate(rectangle.modelMatrix, rectangle.modelMatrix, vec3.fromValues(0.0, -0.5, 3.0));
    mat4.scale(rectangle.modelMatrix, rectangle.modelMatrix, vec3.fromValues(6.0, 1.0, 6.0));

    scene.add(rectangle);

    var animation = new Animation(scene);
    animation.addHandler(keyboard);
    animation.start();
}