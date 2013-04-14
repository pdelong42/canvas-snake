

var Snake = (function() {
    function Snake(p, x, y, cs, f) {
        this._parent = p;
        this._canvas = p.canvas;
        this._context = p.context;

        this._xPosition = x;
        this._yPosition = y;
        this._cellSize = cs;
        this._facing = f;

        this._speed = 1;
        this._body = [
            new SnakeCell(this, x, y, cs, f)
        ];
        this.grow().grow();
    }

    function grow() {
        this._body.push(this.tail.divide());
        return this;
    }

    function feed(food) {
        this._food += food;
        return this;
    }

    function draw() {
        this._body.forEach(function(e,i){ e.draw() });
        return this;
    }

    function rotate(facing) {
        if (Utility.validRotation(this.cells[0].facing, facing))
            this._facing = facing;
        return this;
    }

    function step() {
        var f = this._facing;

        if (this._food && this._food--)
            this.grow();

        GridObject.prototype.step.call(this);

        this._body.forEach(function(e,i) {
            var cf = e._facing;
            e.rotate(f);
            e.step();
            f = cf;
        });

        return this;
    }

    function onUpdate(g) {
        var h = this.head, _t = this.tail,
            t = {
                _facing: Utility.invertFacing(_t._facing),
                _xPosition: _t._xPosition,
                _yPosition: _t._yPosition,
                _speed: _t._speed
            };

        GridObject.prototype.step.call(t);

        g.set(h._xPosition, h._yPosition, Grid.Values.SNAKE);
        g.set(t._xPosition, t._yPosition, Grid.Values.OPEN);

        return this;
    }

    function onAdd(g) {
        this._body.forEach(function(e,i){
            g.set(e._xPosition, e._yPosition, Grid.Values.SNAKE)
        });
        return this;
    }

    function onRemove(g) {
    }

    Snake.prototype = PrototypeFactory.makePrototype(GridObject, {
        grow: grow,
        feed: feed,
        draw: draw,
        step: step,
        onAdd: onAdd,
        onUpdate: onUpdate,
        onRemove: onRemove,
        rotate: rotate
    });

    Snake.prototype.__defineGetter__('length', function() {
        return this._body.length
    });
    Snake.prototype.__defineGetter__('head', function() {
        return this._body[0]
    });
    Snake.prototype.__defineGetter__('tail', function() {
        return this._body[this._body.length - 1]
    });

    return Snake;
}());
