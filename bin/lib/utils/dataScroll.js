"use strict";
// import smoothscroll from 'smoothscroll-polyfill';
Object.defineProperty(exports, "__esModule", { value: true });
// smoothscroll.polyfill();
const dataScroll = (polyfill) => {
    if (polyfill) {
        polyfill();
    }
    const btns = document.querySelectorAll('[data-scroll]');
    btns.forEach(btn => {
        btn.addEventListener('click', e => clickHandler(e));
    });
    HTMLElement.prototype.dataScroll = function () {
        this.addEventListener('click', e => clickHandler(e));
    };
    const clickHandler = (e) => {
        const data = e.target.dataset.scroll;
        const target = document.querySelector(`[data-target-scroll="${data}"]`);
        if (target) {
            window.scroll({
                behavior: 'smooth',
                left: 0,
                top: target.offsetTop
            });
        }
    };
};
exports.default = dataScroll;
//# sourceMappingURL=dataScroll.js.map