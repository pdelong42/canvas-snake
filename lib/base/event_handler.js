
// requires Abstract

var EventHander = (function() {
    function EventHander(p) {
        this._parent = p;
    }

    function register(type, fn) {
        var te = this._events[type] || [];
        if (Abstract.isCallable(fn))
            te.push(fn)
        this._events[type] = te;
        return this;
    }

    function remove(type, fn) {
        var te = this._events[type] || [];
        te = te.filter(function(e,i,a) { return e != fn });
        this._events[type] = te;
        return this;
    }

    function activate(type) {
        var args = Array.prototype.slice.call(arguments),
            te = this._events[type] || [];

        args.unshift();
        args.shift(this._parent);

        te.forEach(function(e,i) { e.apply(null, args) });
    }

    EventHander.prototype = {
        regsiter: register,
        remove: remove,
        activate: activate
    };

    return EventHander;
}());
