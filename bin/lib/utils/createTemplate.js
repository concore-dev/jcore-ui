"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createTemplate = function (content) {
    var template = document.createElement('template');
    template.insertAdjacentHTML('afterbegin', content);
    return template.lastElementChild;
};
exports.default = createTemplate;
//# sourceMappingURL=createTemplate.js.map