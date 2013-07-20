

var Grid = (function() {
    function Grid() {
        var args = Array.prototype.slice.call(arguments);
        GridObject.apply(this, args);

        args.shift();

        this._width = args.shift() + 2;
        this._height = args.shift() + 2;
        this._data = new Array(this._width * this._height);
        this._objects = [];
        this._updaters = [];

        var g = Grid.Values, d = this._data;
        for (var h = this._height, _h = h - 1, j = 0; j < h; j++)
            for (var w = this._width, _w = w - 1, i = 0; i < w; i++)
                d[(w * j) + i] = (i==0||j==0||i==_w||j==_h) ? g.WALL : g.OPEN;
    }

    Grid.Facing = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3 };
    Grid.Values = { WALL: -1, OPEN: 0, GOOD: 1 };

    Grid.prototype = Object.create(GridObject.prototype, {
        get: {
            value: function(x, y) {
                return this._data[(this._width * (y + 1)) + (x + 1)];
            },
            enumerable: true
        },
        set: {
            value: function(x, y, v) {
                this._data[(this._width * (y + 1)) + (x + 1)] = v;
                return this;
            },
            enumerable: true
        },
        add: {
            value: function(obj) {
                if (Abstract.isCallable(obj.onAdd))
                    obj.onAdd.call(obj, this);
                this._objects.push({
                    o: obj,
                    s: obj.step || new Function(),
                    u: obj.onUpdate || new Function(),
                    d: obj.draw || new Function()
                });
                return this;
            },
            enumerable: true
        },
        remove: {
            value: function(obj) {
                this._objects = this._objects.filter(function(e,i,a){
                    if (e.o == obj) {
                        if (Abstract.isCallable(e.o.onRemove))
                            e.o.onRemove.call(e.o, this);
                        return false
                    }
                    return true;
                });
                return this;
            },
            enumerable: true
        },
        step: {
            value: function() {
                this._objects.forEach(function(e,i){
                    e.s.call(e.o);
                    e.u.call(e.o, this);
                }.bind(this));
                return this;
            },
            enumerable: true
        },
        dumpData: {
            value: function() {
                var s = "";
                for (var j = 0; j < this._height; j++) {
                    for (var i = 0; i < this._width; i++) {
                        s += " " +
                            ((this._data[(this._width * j) + i]>=0)?" ":"") + " " +
                            this._data[(this._width * j) + i] + " ";
                    }
                    s += "\n";
                }
                console.log(s);
            }
        }
    });
    Grid.prototype.constructor = Grid;

    return Grid;
}());


/*

var Grid = (function() {
    function Grid(p, w, h, cs) {
        this._parent = p;
        this._canvas = p.canvas;
        this._context = p.context;

        this._cellSize = cs;
        this._width = w + 2;
        this._height = h + 2;

        this._data = new Array(this._width * this._height);
        this._objects = [];
        this._updaters = [];

        prepareData.call(this);
        prepareCanvas.call(this);
    }


    function clearCanvas() {
        this.context.fillStyle = "#222";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    function prepareCanvas() {
        var c = this.canvas,
            w = this._width * this._cellSize,
            h = this._height * this._cellSize;

        c.width = w;
        c.height = h;

        c.style.width = w + 'px';
        c.style.height = h + 'px';

        clearCanvas.call(this);
    }

    function drawObjects() {
        this._objects.forEach(function(e,i){e.d.call(e.o)});
        return this;
    }

    function draw() {
        clearCanvas.call(this);
        drawObjects.call(this);
        return this;
    }

    Grid.prototype = PrototypeFactory.makeApplicationObject({
        get: get,
        set: set,
        add: add,
        remove: remove,
        step: step,
        draw: draw,

        dumpData: function() {
            var s = "";
            for (var j = 0; j < this._height; j++) {
                for (var i = 0; i < this._width; i++) {
                    s += " " +
                        ((this._data[(this._width * j) + i]>=0)?" ":"") + " " +
                        this._data[(this._width * j) + i] + " ";
                }
                s += "\n";
            }
            console.log(s);
        }

    });

    return Grid;
}());
*/
