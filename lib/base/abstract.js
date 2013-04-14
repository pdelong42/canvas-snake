

var Abstract = (function() {
    return {
        isCallable: function (arg) {
            if (typeof arg === 'function')
                return true;
            if (typeof arg === 'object')
                return (this.isCallable(arg.call));
            return false;
        }
    }
}());
