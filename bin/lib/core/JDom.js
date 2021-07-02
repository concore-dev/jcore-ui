"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JDom = exports.$ = void 0;
function $(element) {
    return new JDom(element);
}
exports.$ = $;
;
class JDom {
    constructor(element) {
        if (typeof element === 'string') {
            this.element = Array.from(document.querySelectorAll(element));
        }
        else if (element instanceof HTMLElement) {
            this.element = [element];
        }
        else if (element instanceof NodeList) {
            this.element = Array.from(element);
        }
    }
    get(index) {
        if (index !== undefined) {
            return this.element[index];
        }
        if (this.element[0] !== undefined) {
            return this.element[0];
        }
        return null;
    }
    find(element) {
        if (typeof element !== 'string') {
            return element;
        }
        this.element = Array.from(document.querySelectorAll(element));
        return new JDom(element);
    }
    addClass(...classes) {
        this.element.forEach(el => {
            el.classList.add(...classes);
        });
        return this;
    }
}
exports.JDom = JDom;
