




var KeyboardManager = (function() {
    var keydown_map = {
        37: function(type, e) { return this.keyboardEvent(type, e) },
        38: function(type, e) { return this.keyboardEvent(type, e) },
        39: function(type, e) { return this.keyboardEvent(type, e) },
        40: function(type, e) { return this.keyboardEvent(type, e) }
    };
    var keypress_map = {
        32: function(e) { return this.keyboardEvent(e) }
    };
    var keyup_map;

    function KeyboardManager(p, a) {
        this._parent = p;
        this._application = a;
    }

    function handler_generator(obj, type) {
        return function(e) {
            var e = e || window.event,
                f = obj[e.keyCode];
            if (Abstract.isCallable(f))
                f.call(this, type, e);
        }
    }

    function registerManagers() {
        window.onkeydown = this.onkeydown.bind(this._application);
        window.onkeypress = this.onkeypress.bind(this._application);
        window.onkeyup = this.onkeyup.bind(this._application);
        return this;
    }

    KeyboardManager.prototype = {
        onkeydown: handler_generator(keydown_map, 'keydown'),
        onkeypress: handler_generator(keypress_map, 'keypress'),
        onkeyup: handler_generator(keyup_map, 'keyup')
    }

    return KeyboardManager;
}());
