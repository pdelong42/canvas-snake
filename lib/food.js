
var SnakeFood = (function() {

    var snake_food_colors = ["fff", "f00", "0f0", "00f"];

    function SnakeFood(p, x, y, s, v) {
        this.parent = p;
        this.context = p.context;
        this.x = x;
        this.y = y;
        this.size = s;
        this.value = v;
    }

    function draw() {
        var c = this.context;

        c.strokeStyle = "#000";
        c.strokeRect(this.x, this.y, this.size, this.size);

        c.fillStyle = snake_food_colors[this.value];
        c.fillRect(this.x + 1, this.y + 1, this.size - 2, this.size - 2);

        return this;
    }

    SnakeFood.prototype = {
        draw: draw
    };

    return SnakeFood;
}());
