"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createTemplate = (content) => {
    const template = document.createElement('template');
    template.insertAdjacentHTML('afterbegin', content);
    return template.lastElementChild;
};
exports.default = createTemplate;
//# sourceMappingURL=createTemplate.js.map