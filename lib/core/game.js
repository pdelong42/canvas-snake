

var Game = (function() {
    function Game(p, w, h, cs) {
        this._parent = p;
        this._canvas = p.canvas;
        this._context = p.context;

        this._cellSize = cs;
        this._width = w;
        this._height = h;

        this._grid = new Grid(this, w, h, cs);
        this._grid.add(new Snake(this, (w/2)|0, (h/2)|0, cs, Grid.Facing.LEFT));
    }

    function step() {
        this._grid.step();
    }

    function run() {
        this.step();
        this.draw();
    }

    function draw() {
        this._grid.draw();
    }

    Game.prototype = PrototypeFactory.makeApplicationObject({
        run: run,
        draw: draw,
        step: step
    });

    return Game;
}());
