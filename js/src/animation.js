function Animation(webGL) {
    this.webGL = webGL;
    this.handlers = [];

    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
}

Animation.prototype = {
    addHandler: function(handler) {
        this.handlers.push(handler);
    },
    start: function() {
        var webGL = this.webGL;
        var animation = this;
        function tick() {
            requestAnimFrame(tick);
            animation.handlers.forEach(function(handler) {
                handler.handle();
            });
            webGL.draw();
        }
        tick();
    }
};