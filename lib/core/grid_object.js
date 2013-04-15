

var GridObject = (function() {
    function GridObject() {
    }

    function draw() {
        var c = this.context,
            s = this._cellSize,
            w = this._width * s,
            h = this._height * s,
            x = this._xPosition * s,
            y = this._yPosition * s;

        c.strokeStyle = this._borderStyle;
        c.strokeRect(x, y, w, h);

        c.fillStyle = this._fillStyle;
        c.fillRect(x + 1, y + 1, w - 2, h - 2);

        return this;
    }

    function step(facing) {
        var f = facing || this._facing,
            s = this._speed;

        switch (f) {
        case Grid.Facing.UP:    this._yPosition -= s; break;
        case Grid.Facing.DOWN:  this._yPosition += s; break;
        case Grid.Facing.LEFT:  this._xPosition -= s; break;
        case Grid.Facing.RIGHT: this._xPosition += s; break;
        }

        return this;
    }

    function slide(facing) {
        return this.step(Utility.invertFacing(facing||this._facing));
    }

    function rotate(facing) {
        this._facing = facing;
        return this;
    }

    function onAdd(g) {
    }

    function onUpdate(g) {
    }

    function onRemove(g) {
    }

    GridObject.prototype = PrototypeFactory.makeApplicationObject({
        draw: draw,
        step: step,
        slide: slide,
        rotate: rotate,
        onAdd: onAdd,
        onUpdate: onUpdate,
        onRemove: onRemove
    });

    return GridObject;
}());
