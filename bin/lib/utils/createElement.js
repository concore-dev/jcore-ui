"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createElement(content) {
    const template = document.createElement('template');
    template.insertAdjacentHTML('afterbegin', content);
    return template.lastElementChild;
}
exports.default = createElement;
//# sourceMappingURL=createElement.js.map