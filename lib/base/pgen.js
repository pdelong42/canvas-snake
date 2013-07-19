

var PGen = (function() {
    function mixin(host, changes) {
        var properties = {};
        Object.getOwnPropertyNames(changes).forEach(function(e,i){
            properties[e] = Object.getOwnPropertyDescriptor(changes, e);
        })
        Object.defineProperties(host, properties);
        return host;
    }

    function deep_copy(obj) {
        switch (Object.prototype.toString.call(obj)) {
        case "[object Array]":
            var length = obj.length, clone_array = new Array(length);
            while (length--) clone_array[length] = deep_copy[length];
            return clone_array;
        case "[object Object]":
            return mixin({}, obj);
        default:
            return obj;
        }
    }

    function _merge(host, list) {
        var length = list.length;
        while (length--) host = mixin(host, list.shift())
        return host;
    }

    function merge() {
        var args = Array.prototype.slice.call(arguments),
            host = _merge({}, args);
        return host;
    }


    function named_merge() {
        var args = Array.prototype.slice.call(arguments),
            host = args.shift() || {};
        return _merge(host, args);
    };

    function pmerge() {
        var args = Array.prototype.slice.call(arguments).
            map(function(e) { return e.prototype });
        host = merge.apply(null, args);
        delete host.constructor;
        return host;
    }

    return {
        mixin: mixin,
        merge: merge,
        namedMerge: named_merge,
        prototypeMerge: pmerge
    };
}());
