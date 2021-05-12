"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function inScreen(element, callback) {
    let init = false;
    function check() {
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight, windowScroll = document.documentElement.scrollTop || document.body.scrollTop, elemRect = windowScroll + element.getBoundingClientRect().top, windowCordStart = windowScroll, windowCordEnd = windowHeight + windowScroll, elemCordStart = windowScroll + element.getBoundingClientRect().top, elemCordEnd = elemRect + element.clientHeight;
        if (elemCordStart - 300 <= windowCordEnd && windowCordStart <= elemCordEnd + 300 && init !== true) {
            init = true;
            callback();
        }
    }
    check();
    window.addEventListener('scroll', () => check());
}
exports.default = inScreen;
// inScreen(mapElement, map.init.bind(map))
//# sourceMappingURL=inScreen.js.map