

var Application = (function() {
    function Application(context) {
        var args = rectify(context),
            container = args['container'],
            canvas = args['canvas'],
            context = canvas.getContext('2d'),
            cellSize = args['cell-size'] || 15,
            width    = args['width'] || 26,
            height   = args['height'] || 20;

        this._container = container;
        this._canvas = canvas;
        this._context = context;

        this._eventHandler = new EventHander(this);
        this._display = new Display(this);
        this._game = new Game(this, width, height, cellSize);
    }

    function rectify(c) {
        var c = c || {},
            id = c['container-id'],
            dv = c['container'],
            dc = c['canvas'];

        if (id && dv && dc)
            return c;

        if (id && dv) {
            c['canvas'] = dv.getElementsByTagName('canvas')[0];
            return c;
        }

        if (id && dc) {
            c['container'] = document.getElementById(id);
            return c;
        }
        if (id) {
            dc = document.getElementById(id);
            c['canvas'] = dc.getElementsByTagName('canvas')[0];
            c['container'] = dc;
            return c;
        }

        throw new Error("Cannot rectify application arguments.");
    }

    function run() {
        this._game.run();
    }

    Application.prototype = PrototypeFactory.makeApplicationObject({
        run: run,
        registerEvent: function(type, fn) {
            this._eventHandler.register(type, fn);
            return this;
        },
        removeEvent: function(type, fn) {
            this._eventHandler.remove(type, fn);
            return this;
        },
        callEvent: function(type, args) {
            this._eventHandler.activate.apply(this, args);
            return this;
        }
    });

    return Application;
}());
