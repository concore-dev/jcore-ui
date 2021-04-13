"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function waitFor(source, callback, opt) {
    const options = Object.assign({ count: 10, time: 1000 }, opt);
    (function check() {
        var result = source();
        if (result) {
            callback(result);
            return;
        }
        if (options.count === 0) {
            return;
        }
        options.count -= 1;
        setTimeout(check, options.time);
    }());
}
exports.default = waitFor;
;
//# sourceMappingURL=waitFor.js.map