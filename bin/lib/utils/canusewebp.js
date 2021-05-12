"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canusewebp = () => {
    var elem = document.createElement('canvas');
    if (!!(elem.getContext && elem.getContext('2d'))) {
        // was able or not to get WebP representation
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }
    else {
        return false;
    }
};
exports.default = canusewebp;
//# sourceMappingURL=canusewebp.js.map