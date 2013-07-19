


var Application = (function() {
    function Application() {
        var args = Array.prototype.slice.call(arguments);
        EventedObject.apply(this, args);
    }

    Application.prototype = Object.create(EventedObject.prototype, {
    });
    Application.prototype.constructor = Application;

    return Application;
}());




/*



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
        this._grid = new Grid(this, width, height, cellSize);
        this._game = new Game(this, this._display, this._grid);

        this.registerEvent('error', function() {
            console.log('foo');
            console.log(arguments);
        });
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

    Application.prototype = PrototypeFactory.makeEventedApplicationObject({
        run: run
    });

    return Application;
}());
*/
