"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookie = {
    set: function (name, value, opt) {
        const options = Object.assign({
            path: '/',
        }, opt || {});
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }
        document.cookie = updatedCookie;
    },
    get: function (name) {
        let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
};
exports.default = cookie;
//# sourceMappingURL=cookie.js.map