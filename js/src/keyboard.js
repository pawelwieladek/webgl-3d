function Keyboard(state) {
    this.state = state;
    var pressedKeys = {};
    function handleKeyDown(event) {
        pressedKeys[event.keyCode] = true;
    }
    function handleKeyUp(event) {
        pressedKeys[event.keyCode] = false;
    }
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
    this.pressedKeys = pressedKeys;
}

Keyboard.prototype = {
    handle: function() {
        if (this.pressedKeys[33]) {
            // Page Up
            this.state.z -= 0.05;
        }
        if (this.pressedKeys[34]) {
            // Page Down
            this.state.z += 0.05;
        }
        if (this.pressedKeys[37]) {
            // Page Up
            this.state.x -= 0.05;
        }
        if (this.pressedKeys[39]) {
            // Page Down
            this.state.x += 0.05;
        }
        if (this.pressedKeys[40]) {
            // Page Up
            this.state.y -= 0.05;
        }
        if (this.pressedKeys[38]) {
            // Page Down
            this.state.y += 0.05;
        }
    }
};