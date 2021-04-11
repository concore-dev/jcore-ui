"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter_1 = __importDefault(require("../utils/EventEmitter"));
class Component {
    constructor(props) {
        this._mount = false;
        /**
         * Если пришел массив HTMLElement,
         * то для каждого вызываем экземпляр компонента
         * и записываем их в массив
         */
        if (Array.isArray(props.$element) || props.$element instanceof NodeList) {
            let array = Array.from(props.$element);
            let newProps = props;
            if (array.length) {
                this.components = array.map(el => {
                    if (this._mount || el.hasAttribute('data-mount'))
                        return;
                    newProps.$element = el;
                    return new props.Component(newProps);
                }).filter(cpm => cpm);
            }
            else {
                throw Error(`Не найден HTMLElement ${this.constructor.name}`);
            }
            return this;
        }
        /**
         * Если не передали свойство HTMLElement,
         * то делаем поиск по селектору элемента и вызываем для него экземпляр компонента
         */
        if (!props.$element) {
            return new props.Component({
                ...props,
                $element: document.querySelectorAll(props.selectors.element)
            });
        }
        this.$element = props.$element instanceof Element ? props.$element : document.querySelector(props.$element);
        if (!this.$element) {
            throw Error(`Не найден HTMLElement ${this.constructor.name}`);
        }
        this.options = {
            mount: true,
            name: this.$element.dataset.name || props.options && props.options.name || ''
        };
        this.on = {
            mount: () => { },
            render: () => { },
            destroy: () => { },
            unmount: () => { },
        };
        this.selectors = props.selectors;
        this.emitter = props.emitter || new EventEmitter_1.default();
        this.options = Object.assign(this.options, props.options || {});
        this.on = Object.assign(this.on, props.on || {});
    }
    mount() {
        this.$element.setAttribute('data-mount', 'true');
        this._mount = true;
    }
    getByName(components, name) {
        return components.filter(component => component.options.name === name)[0];
    }
    unmount() {
        this._mount = false;
        this.$element.removeAttribute('data-mount');
    }
}
exports.default = Component;
//# sourceMappingURL=Component.js.map