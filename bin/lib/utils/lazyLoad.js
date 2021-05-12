"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazy = void 0;
const canusewebp_1 = __importDefault(require("./canusewebp"));
const lazyLoad = function (element) {
    let images;
    if (typeof element === "string") {
        images = document.querySelectorAll('[data-lazy]');
    }
    else if (element instanceof HTMLElement) {
        images = [element];
    }
    else if (element instanceof NodeList) {
        images = element;
    }
    images.forEach(function (item) {
        let format;
        if (item.hasAttribute('data-format')) {
            format = canusewebp_1.default() ? '.webp' : '.jpg';
        }
        lazy(item, format);
        window.addEventListener('scroll', function () {
            lazy(item, format);
        });
    });
};
exports.default = lazyLoad;
function lazy(item, format = null) {
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight, windowScroll = document.documentElement.scrollTop || document.body.scrollTop, elemRect = windowScroll + item.getBoundingClientRect().top, windowCordStart = windowScroll, windowCordEnd = windowHeight + windowScroll, elemCordStart = windowScroll + item.getBoundingClientRect().top, elemCordEnd = elemRect + item.clientHeight;
    if (elemCordStart - 300 <= windowCordEnd && windowCordStart <= elemCordEnd + 300 && item.getAttribute('data-lazy') !== 'loaded') {
        if (item.localName == 'img') {
            if (item.parentElement.localName != 'picture') {
                if (format) {
                    item.setAttribute('src', item.dataset.lazy + format);
                }
                else {
                    item.setAttribute('src', item.dataset.lazy);
                }
                item.setAttribute('data-lazy', 'loaded');
                return false;
            }
            let source = item.parentNode.querySelectorAll('source');
            source.forEach(function (elem) {
                // if (format) {
                //     elem.setAttribute('srcset', elem.dataset.lazy + format);
                // } else {
                //     elem.setAttribute('srcset', elem.dataset.lazy);
                // }
                elem.setAttribute('srcset', elem.dataset.lazy);
                item.setAttribute('lazy-load', 'loaded');
            });
        }
        else {
            item.style.backgroundImage = `url(${item.dataset.lazy})`;
        }
    }
}
exports.lazy = lazy;
//# sourceMappingURL=lazyLoad.js.map