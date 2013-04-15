

var LoadApplication = (function() {
    return function() {
        var application = new Application({
                'container-id': 'app',
                'cellSize': 20,
                'width': 26,
                'height': 20
            }),
            display = Application._display,
            game = application._game,
            grid = application._grid;

        var w = grid._width, h = grid._height, cs = grid._cellSize;

        var snake = new Snake(grid, (w/2)|0, (h/2)|0, Grid.Facing.LEFT);
        var food = new Food(grid, (Math.random()*w)|0, (Math.random()*h)|0);

        grid.add(snake).add(food);

        application.run();
    };
}());
