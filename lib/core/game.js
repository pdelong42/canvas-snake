

var Game = (function() {
    function Game(p, d, g) {
        this._parent = p;
        this._canvas = p.canvas;
        this._context = p.context;

        this._display = d;

        this._grid = g;
        this._cellSize = g._cellSize;
        this._width = g._width;
        this._height = g._height;
        //this._grid = new Grid(this, w, h, cs);

    }

    Game.State = {
        NULL: 0,
        RUNNING: 1,
        WIN: 2,
        LOST: 3
    };

    function step() {
        this._display.step();
        this._grid.step();
    }

    function sub_runner() {
        switch (this._state) {
        case Game.State.NULL:
            this._parent.callEvent('error', 'Null game state');
            break;
        case Game.State.RUNNING:
            this.step();
            this.draw();
            window.setTimeout(sub_runner.bind(this), 250);
            break;
        case Game.State.WIN:
            this._parent.callEvent('game-win');
            break;
        case Game.State.LOST:
            this._parent.callEvent('game-lose');
            break;
        }
    }

    function run() {
        this._state = Game.State.RUNNING;
        this.draw();
        window.setTimeout(sub_runner.bind(this), 0);
        return this;
    }

    function draw() {
        this._display.draw();
        this._grid.draw();
    }

    Game.prototype = PrototypeFactory.makeApplicationObject({
        run: run,
        draw: draw,
        step: step
    });

    return Game;
}());
