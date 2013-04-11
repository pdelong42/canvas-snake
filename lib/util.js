
var Utility = (function(){
    var facing_inverter = {
        "up" : "down",
        "down": "up",
        "right": "left",
        "left": "right"
    };

    return {
        invertFacing: function(facing) {
            return facing_inverter[facing];
        },
        validRotation: function(facing, rotation) {
            return (facing != facing_inverter[rotation]);
        }
    };
}());
