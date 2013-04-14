

var Display = (function() {
    function Display(p) {
        this._parent = p;
    }

    function step() {
    }

    function draw() {
    }

    Display.prototype = {
        step: step,
        draw: draw
    };

    return Display;
}());
