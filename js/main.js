function main() {
    var keyboard = new Keyboard();
    var canvas = document.getElementById("gl-canvas");

    var webGL = new WebGL(canvas);
    webGL.init();

    var animation = new Animation(webGL);
    animation.addHandler(keyboard);
    animation.start();
}