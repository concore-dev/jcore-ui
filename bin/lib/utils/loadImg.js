"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loadImg = (img, resolve, reject = () => { }) => {
    const image = new Image();
    let src;
    if (img instanceof HTMLImageElement) {
        src = img.getAttribute('src');
    }
    else if (img.constructor.name === 'string') {
        src = img;
    }
    image.onload = function () {
        resolve();
    };
    image.onerror = function () {
        reject();
    };
    image.src = src;
};
exports.default = loadImg;
//# sourceMappingURL=loadImg.js.map