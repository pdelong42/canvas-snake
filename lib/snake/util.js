
var Utility = (function(){
    function invertFacing(facing) {
        switch (facing) {
        case Grid.Facing.UP:    return Grid.Facing.DOWN;  break;
        case Grid.Facing.DOWN:  return Grid.Facing.UP;    break;
        case Grid.Facing.LEFT:  return Grid.Facing.RIGHT; break;
        case Grid.Facing.RIGHT: return Grid.Facing.LEFT;  break;
        }
    }

    return {
        invertFacing: invertFacing,
        validRotation: function(facing, rotation) {
            return (facing != invertFacing(rotation));
        }
    };
}());
