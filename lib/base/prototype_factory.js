

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

    return {
        makePrototype: makePrototype,
        makeApplicationObject: makeApplicationObject
    };
}());
