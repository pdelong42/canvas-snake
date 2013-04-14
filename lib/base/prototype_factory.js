

var PrototypeFactory = (function() {
    function mergeObjects(host, changes) {
        for (var p in changes)
            if (changes.hasOwnProperty(p))
                host[p] = changes[p];
        return host;
    }

    function makePrototype(O, c) {
        return mergeObjects(new O(), c);
    }

    function ApplicationObjectInterface() {}
    ApplicationObjectInterface.prototype = {
        get canvas() { return this._canvas; },
        get context() { return this._context; }
    };

    function makeApplicationObject(c) {
        return makePrototype(ApplicationObjectInterface, c);
    }

    function EventedApplicationObject() {}
    EventedApplicationObject.prototype = makeApplicationObject({
        registerEvent: function(type, fn) {
            this._eventHandler.register(type, fn);
            return this;
        },
        removeEvent: function(type, fn) {
            this._eventHandler.remove(type, fn);
            return this;
        },
        callEvent: function() {
            var a = Array.prototype.slice.call(arguments);
            a.splice(1, 0, this);
            this._eventHandler.activate.apply(this._eventHandler, a);
       }
    });

    function makeEventedApplicationObject(c) {
        return makePrototype(EventedApplicationObject, c);
    }

    return {
        makePrototype: makePrototype,
        makeApplicationObject: makeApplicationObject,
        makeEventedApplicationObject: makeEventedApplicationObject
    };
}());
