var AnnelidCell = (function() {
    function AnnelidCell(parent, x, y, size, facing) {
        this.parent = parent;
        this.context = parent.context;
        this.x = x;
        this.y = y;
        this.size = size;
        this.facing = facing;
    }

    function draw() {
        var c = this.context;

        c.strokeStyle = "#000";
        c.strokeRect(this.x, this.y, this.size, this.size);

        c.fillStyle = "#ccc";
        c.fillRect(this.x + 1, this.y + 1, this.size - 2, this.size - 2);

        return this;
    }

    function rotate(facing) {
        this.facing = facing;
        return this;
    }

    function shift(facing) {
        switch (facing||this.facing) {
        case "up":     this.y -= this.size;  break;
        case "down":   this.y += this.size;  break;
        case "left":   this.x -= this.size;  break;
        case "right":  this.x += this.size;  break;
        }
        return this;
    }

    function slide(facing) {
        this.shift(Utility.invertFacing(facing||this.facing));
        return this;
    }

    function divide() {
        var ac = new AnnelidCell(this.parent, this.x, this.y,
                                 this.size, this.facing);
        ac.slide();
        return ac;
    }

    AnnelidCell.prototype = {
        shift : shift,
        slide : slide,
        draw : draw,
        rotate : rotate,
        divide : divide
    };

    return AnnelidCell;
}());
