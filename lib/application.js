

var Application = (function() {
    function Application(o) {
        var o = o || {},
            w = o['width'] || 26,
            h = o['height'] || 20,
            cw = o['cellSize'] || 12,
            width = w * cw,
            height = h * cw,
            canvasWidth = width + 2,
            canvasHeight = height + 2,
            canvas = o['canvas'] || document.getElementsByTagName('canvas')[0],
            ctx = canvas.getContext('2d');

        canvas.width = canvasWidth;
        canvas.style.width = canvasWidth + "px";

        canvas.height = canvasHeight;
        canvas.style.height = canvasHeight + "px";

        ctx.translate(1,1);

        this.canvas = canvas;
        this.context = ctx;
        this.running = true;

        var snake = new Annelid(this, cw, (width/2)|0, (height/2)|0, "left"),
            grid = new GameGrid(this, w, h, cw);

        this.snake = snake.feed({value: 2});
        this.grid = grid.loadSnake(this.snake).spawnFood();

        window.onkeydown = this.onkeydown.bind(this);
    }

    function clear() {
        this.context.fillStyle = "#222";
        this.context.fillRect(-1, -1, this.canvas.width, this.canvas.height);
    }

    function step() {
        this.grid.clearTail();
        this.snake.step();
        this.grid.step();
        this.draw();
    }

    function onkeydown(e) {
        var e = e || window.event;
        switch (e.keyCode) {
        case 32: this.running = !this.running;  break;
        case 37: this.snake.rotate("left");     break;
        case 38: this.snake.rotate("up");       break;
        case 39: this.snake.rotate("right");    break;
        case 40: this.snake.rotate("down");     break;
        }
    }

    function draw() {
        this.clear();
        this.snake.draw();
        this.grid.draw();
    }

    function run() {
        this.draw();
        window.setTimeout(function() {
            this.step();
            this.draw();
            if (this.running)
                this.run();
        }.bind(this), 250);
    }

    function end() {
        this.running = false;
        return this;
    }

    function feed(food) {
        this.snake.feed(food);
        return this;
    }

    Application.prototype = {
        clear : clear,
        step : step,
        onkeydown: onkeydown,
        draw: draw,
        run : run,
        end: end,
        feedTheSnake: feed
    }

    return Application;
}());
