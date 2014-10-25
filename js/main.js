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
    webGL.init();

    var animation = new Animation(webGL);
    animation.addHandler(keyboard);
    animation.start(camera);
}