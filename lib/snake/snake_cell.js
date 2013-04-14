

var SnakeCell = (function() {
    function SnakeCell(p, x, y, cs, f) {
        this._parent = p;
        this._canvas = p.canvas;
        this._context = p.context;
        this._cellSize = cs;
        this._xPosition = x;
        this._yPosition = y;
        this._facing = f;

        this._speed = 1;
        this._width = 1;
        this._height = 1;

        this._borderStyle = "#000";
        this._fillStyle = "#ccc";
    }

    function divide() {
        return (new SnakeCell(this._parent, this._xPosition, this._yPosition,
                              this._cellSize, this._facing)).slide();
    }

    SnakeCell.prototype = PrototypeFactory.makePrototype(GridObject, {
        divide: divide
    });

    return SnakeCell;
}());
