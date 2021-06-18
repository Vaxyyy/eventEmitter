window.EventEmitter = (function () {
    function EventEmitter() {
        this.events = {};
    }

    EventEmitter.prototype.on = function (event, callback) {
        if (!this.events.hasOwnProperty(event)) {
            this.events[event] = [];
        }

        this.events[event].push(callback);

        return this;
    }

    EventEmitter.prototype.removeListener = function (name, listenerToRemove) {
        if (!this.events[name]) {
            throw new Error(`Can't remove a listener. Event "${name}" doesn't exits.`);
        }

        const filterListener = (listener) => listener !== listenerToRemove;

        return this.events[name] = this.events[name].filter(filterListener);
    }

    EventEmitter.prototype.emit = function (event, ...data) {
        if (!this.events.hasOwnProperty(event)) {
            return null;
        }

        for (let i = 0; i < this.events[event].length; i++) {
            const callback = this.events[event][i];

            callback.call(this, ...data);
        }
    }

    EventEmitter.prototype.once = function (event, listener) {
        return this.on(event, function g() {
            this.removeListener(event, g);
            return listener.apply(this, arguments);
        });
    };

    EventEmitter.prototype.removeAllListeners = function () {
        Object.keys(this.events).forEach((event) =>
            this.events[event].splice(0, this.events[event].length)
        );
    }


    return EventEmitter;

})();
