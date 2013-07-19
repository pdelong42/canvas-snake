
// requires Abstract

var EventHandler = (function() {
    function EventHandler(p) {
        this._parent = p;
        this._events = {};
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
        return this;
    }

    EventHandler.prototype = Object.create(null, {
        parent: { enumerable: true, get: function() { return this._parent }},
        events: { enumerable: true, get: function() { return this._events }},
        register: { value: register, enumerable: true },
        remove: { value: remove, enumerable: true },
        activate: { value: activate, enumerable: true}
    });

    return EventHandler;
}());
