function Keyboard() {
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

        }
        if (this.pressedKeys[34]) {

        }
        if (this.pressedKeys[37]) {

        }
        if (this.pressedKeys[39]) {

        }
        if (this.pressedKeys[40]) {

        }
        if (this.pressedKeys[38]) {
            
        }
    }
};