function main() {
    var state = new State();
    var keyboard = new Keyboard(state);
    var canvas = document.getElementById("gl-canvas");

    var webGL = new WebGL(canvas);
    webGL.init();

    var animation = new Animation(webGL);
    animation.addHandler(keyboard);
    animation.start(state);
}