"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.events = {};
    }
    EventEmitter.prototype.on = function (event, listener) {
        var _this = this;
        if (typeof this.events[event] !== 'object') {
            this.events[event] = [];
        }
        this.events[event].push(listener);
        return function () { return _this.removeListener(event, listener); };
    };
    EventEmitter.prototype.removeListener = function (event, listener) {
        if (typeof this.events[event] === 'object') {
            var idx = this.events[event].indexOf(listener);
            if (idx > -1) {
                this.events[event].splice(idx, 1);
            }
        }
    };
    EventEmitter.prototype.emit = function (event) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (typeof this.events[event] === 'object') {
            this.events[event].forEach(function (listener) { return listener.apply(_this, args); });
        }
    };
    EventEmitter.prototype.once = function (event, listener) {
        var _this = this;
        var remove = this.on(event, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            remove();
            listener.apply(_this, args);
        });
    };
    return EventEmitter;
}());
;
exports.default = EventEmitter;
//# sourceMappingURL=EventEmitter.js.map