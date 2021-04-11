"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event = {
    transitionEnd: function () {
        var t, el = document.createElement("fakeelement");
        var transitions = {
            "transition": "transitionend",
            "OTransition": "oTransitionEnd",
            "MozTransition": "transitionend",
            "WebkitTransition": "webkitTransitionEnd"
        };
        for (t in transitions) {
            var idx = t;
            if (el.style[idx] !== undefined) {
                return transitions[idx];
            }
        }
    },
    animationEnd: function () {
        var t, el = document.createElement("fakeelement");
        var animations = {
            "animation": "animationend",
            "OAnimation": "oAnimationEnd",
            "MozAnimation": "animationend",
            "WebkitAnimation": "webkitAnimationEnd"
        };
        for (t in animations) {
            var idx = t;
            if (el.style[idx] !== undefined) {
                return animations[idx];
            }
        }
    }
};
exports.default = event;
//# sourceMappingURL=event.js.map