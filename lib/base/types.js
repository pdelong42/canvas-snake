

var EventedObject = (function() {
    function EventedObject() {
        this._eventHandler = new EventHandler(this);
    }

    EventedObject.prototype = Object.create({}, {
        registerEvent: {
            value: function(type, fn) {
                this._eventHandler.register(type, fn);
                return this;
            },
            enumerable: true
        },
        removeEvent: {
            value: function(type, fn) {
                this._eventHandler.remove(type, fn);
                return this;
            },
            enumerable: true
        },
        callEvent: {
            value: function() {
                var a = Array.prototype.slice.call(arguments);
                a.splice(1, 0, this);
                this._eventHandler.activate.apply(this._eventHandler, a);
            },
            enumerable: true
        },
        eventHandler: {
            get: function() { return this._eventHandler },
            enumerable: true
        }
    });
    EventedObject.prototype.constructor = EventedObject;

    return EventedObject;
}());

var OwnedObject = (function() {
    function OwnedObject(p) {
        this._parent = p;
    }

    OwnedObject.prototype = Object.create({}, {
        parent: {
            get: function() { return this._parent; },
            enumerable: true
        }
    });
    OwnedObject.prototype.constructor = OwnedObject;

    return OwnedObject;
}());


var OwnedEventedObject = (function() {
    function OwnedEventedObject() {
        var args = Array.prototype.slice.call(arguments, 0);
        OwnedObject.apply(this, args);
        EventedObject.apply(this, args);
    }

    OwnedEventedObject.prototype = Object.create(
        PGen.prototypeMerge(EventedObject, OwnedObject), {
        });
    OwnedEventedObject.prototype.constructor = OwnedEventedObject;

    return OwnedEventedObject;
}());


var GridObject = (function() {
    function GridObject() {
        var args = Array.prototype.slice.call(arguments);
        OwnedEventedObject.apply(this, args);
        this._canvas = this._parent.canvas;
        this._context = this._parent.context;
    }

    GridObject.prototype = Object.create(OwnedEventedObject.prototype, {
        canvas: {
            get: function() { return this._canvas; },
            enumerable: true
        },
        context: {
            get: function() { return this._context; },
            enumerable: true
        }
    });
    GridObject.prototype.constructor = GridObject;

    return GridObject;
}());
