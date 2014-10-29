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

    var pointLightOptions = {
        position: vec3.fromValues(0.5, 1.0, 0.5),
        ambientColor: vec3.fromValues(0.1, 0.1, 0.1),
        diffuseColor: vec3.fromValues(0.3, 0.3, 0.3),
        constantAttenuation: 0.1,
        linearAttenuation: 0.1,
        exponentAttenuation: 0.0
    };

    var pointLight = factory.pointLight(pointLightOptions);
    scene.addLight(pointLight);

    var spotLightOptions = {
        position: vec3.fromValues(0.0, 0.0, 0.0),
        direction: vec3.fromValues(0.0, -1.0, 0.0),
        diffuseColor: vec3.fromValues(0.7, 0.7, 0.7),
        outerAngle: 90,
        innerAngle: 30,
        range: 10.0
    };

    var spotLight = factory.spotLight(spotLightOptions);
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