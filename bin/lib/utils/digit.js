"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const digit = {
    add: function (value) {
        return value.toString().replace(/(\d{1,3})(?=((\d{3})*([^\d]|$)))/g, "$1 ").trim();
    },
    remove: function (value) {
        return value.toString().replace(/ +/g, '').trim();
    }
};
exports.default = digit;
//# sourceMappingURL=digit.js.map