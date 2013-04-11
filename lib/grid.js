var GameGrid = (function() {
    function GameGrid(p, w, h, cw) {
        var width = w + 2,
            height = h + 2,
            data = new Array(width * height);

        for (var j = 0; j < height; j++) {
            for (var i = 0; i < width; i++) {
                if (i == 0 || j == 0 || i == (width - 1) || j == (height - 1))
                    data[(width * j) + i] = -1;
                else
                    data[(width * j) + i] = 0;
            }
        }

        this._data = data;
        this.parent = p;
        this.context = p.context;
        this.width = width;
        this.height = height;
        this.cellSize = cw;
        this.food = {};
    }

    function get(x, y) {
        return this._data[(this.width * (y + 1)) + (x + 1)];
    }

    function set(x, y, v) {
        return this._data[(this.width * (y + 1)) + (x + 1)] = v;
    }

    function dumpData() {
        var s = "";
        for (var j = 0; j < this.height; j++) {
            for (var i = 0; i < this.width; i++) {
                s += " " +
                    ((this._data[(this.width * j) + i]>=0)?" ":"") + " " +
                    this._data[(this.width * j) + i] + " ";
            }
            s += "\n";
        }
        console.log(s);
    }

    function loadSnake(snake, x, y) {
        this.snake = snake;

        var h = snake.head, hs = h.size, x = ((h.x/hs)|0), y = ((h.y/hs)|0);//, hf = h.facing,

        var cells = snake.cells,
            length = snake.length;

        for (var i = 0; i < length; i++) {
            this.set(x, y, -1);
            switch (cells[i].facing) {
            case "up":     y += 1;  break;
            case "down":   y -= 1;  break;
            case "left":   x += 1;  break;
            case "right":  x -= 1;  break;
            }
        }

        return this;
    }

    function clearTail() {
        var s = this.snake, t = s.tail,
            ts = t.size, tx = ((t.x/ts)|0), ty = ((t.y/ts)|0);
        if (s.hungry)
            this.set(tx, ty, 0);
        return this;
    }

    function step() {
        var s = this.snake, h = s.head, t = s.tail,
            hs = h.size, hx = ((h.x/hs)|0), hy = ((h.y/hs)|0), hf = h.facing,
            ts = t.size, tx = ((t.x/ts)|0), ty = ((t.y/ts)|0);

        var v = this.get(hx, hy);

        if (v == -1)
            this.parent.end();
        else if (v == 1) {
            this.parent.feedTheSnake(this.food);
            this.spawnFood();
        }
        else if (v == 0)
            this.set(hx, hy, -1);
    }

    function spawnFood() {
        var f = this.food, cw = this.cellSize, fx = (f.x/cw)|0, fy = (f.y/cw)|0,
            cells = [], h = this.height, w = this.width;
        this.set(fx, fy, -1);
        this.food = null;

        while (h--) {
            while (w--)
                if (this.get(w, h) == 0)
                    cells.push({x:w, y:h});
            w = this.width
        }

        var c = cells[(Math.random()*cells.length)|0];

        this.food = new SnakeFood(this,c.x*cw,c.y*cw,cw,((Math.random()*3)|0)+1);
        this.set(c.x, c.y, 1);

        return this;
    }

    function draw() {
        this.food.draw();
        return this;
    }

    GameGrid.prototype = {
        get: get,
        set: set,
        step: step,
        draw: draw,
        clearTail: clearTail,
        loadSnake: loadSnake,
        spawnFood: spawnFood,
        dump: dumpData
    };

    return GameGrid;
}());
