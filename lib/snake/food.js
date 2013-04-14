

var Food = (function() {
    var FoodValues = [
        { v: 2, c: "#0F0" },
        { v: 3, c: "#00F" }
    ];

    function Food(p, cs, x, y) {
        this._parent = p;
        this._canvas = p.canvas;
        this._context = p.context;
        this._cellSize = cs;
        this._xPosition = x;
        this._yPosition = y;
        this._facing = f;

        this._speed = 0;
        this._width = 1;
        this._height = 1;

        var fv = FoodValue[(Math.random()*FoodValues.length)|0];
        this._value = fv.v;
        this._fillStyle = fv.c;
        this._borderStyle = "#000";
    }

    function onAdd(g) {
        g.set(this._xPosition, this._yPosition, Grid.Values.FOOD);
        return this;
    }

    function onRemove(g) {
        g.set(this._xPosition, this._yPosition, Grid.Values.OPEN);
        return this;
    }

    Food.prototype = PrototypeFactory.makePrototype(GridObject, {
        onAdd: onAdd,
        onRemove: onRemove
    });

    return Food;
}());
