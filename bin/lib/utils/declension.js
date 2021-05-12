"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function declension(count, f1, f2, f3) {
    if (count % 100 < 10 || count % 100 > 20) {
        if (1 == count % 10) {
            return f1.replace('%d', count);
        }
        else if ([2, 3, 4].indexOf(count % 10) > -1) {
            return f2.replace('%d', count);
        }
    }
    return f3.replace('%d', count);
}
exports.default = declension;
//# sourceMappingURL=declension.js.map