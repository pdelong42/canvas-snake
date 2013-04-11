var Annelid = (function() {
    function Annelid(p, c, x, y, f) {
        this.parent = p;
        this.context = p.context;
        this.cellSize = c;
        this.x = x;
        this.y = y;
        this.facing = f;
        this.grow = 0;
        this.cells = [(new AnnelidCell(this, x, y, c, f))];
    }

    function feed(food) {
        this.grow += food.value;
        return this;
    }

    function divide() {
        var cells = this.cells,
            last = cells[cells.length - 1];

        cells.push(last.divide());

        return this;
    }

    function draw() {
        this.cells.forEach(function(cell) { cell.draw(); });
        return this;
    }

    function rotate(facing) {
        var head = this.cells[0];
        if (Utility.validRotation(head.facing, facing))
            this.facing = facing;
        return this;
    }

    function step() {
        if (this.grow) {
            this.divide();
            this.grow--;
        }

        switch(this.facing) {
        case "up":     this.y -= this.cellSize;  break;
        case "down":   this.y += this.cellSize;  break;
        case "left":   this.x -= this.cellSize;  break;
        case "right":  this.x += this.cellSize;  break;
        }

        var facing = this.facing;
        this.cells.forEach(function(cell) {
            var cf = cell.facing;
            cell.facing = facing;
            cell.shift();
            facing = cf;
        });

        return this;
    }

    Annelid.prototype = {
        divide: divide,
        draw: draw,
        step: step,
        rotate: rotate,
        feed: feed,

        get length() {
            return this.cells.length;
        },
        get head() {
            return this.cells[0];
        },
        get tail() {
            return this.cells[this.length - 1];
        },
        get hungry() {
            return this.grow == 0;
        }
    };

    return Annelid;
}());
