"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter_1 = __importDefault(require("../utils/EventEmitter"));
var Component = /** @class */ (function () {
    function Component(props) {
        var _this = this;
        this._mount = false;
        /**
         * Если пришел массив HTMLElement,
         * то для каждого вызываем экземпляр компонента
         * и записываем их в массив
         */
        if (Array.isArray(props.$element) || props.$element instanceof NodeList) {
            var array = Array.from(props.$element);
            var newProps_1 = props;
            if (array.length) {
                this.components = array.map(function (el) {
                    if (_this._mount || el.hasAttribute('data-mount'))
                        return;
                    newProps_1.$element = el;
                    return new props.Component(newProps_1);
                }).filter(function (cpm) { return cpm; });
            }
            else {
                throw Error("\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D HTMLElement " + this.constructor.name);
            }
            return this;
        }
        /**
         * Если не передали свойство HTMLElement,
         * то делаем поиск по селектору элемента и вызываем для него экземпляр компонента
         */
        if (!props.$element) {
            return new props.Component(__assign(__assign({}, props), { $element: document.querySelectorAll(props.selectors.element) }));
        }
        this.$element = props.$element instanceof Element ? props.$element : document.querySelector(props.$element);
        if (!this.$element) {
            throw Error("\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D HTMLElement " + this.constructor.name);
        }
        this.options = {
            mount: true,
            name: this.$element.dataset.name || props.options && props.options.name || ''
        };
        this.on = {
            mount: function () { },
            render: function () { },
            destroy: function () { },
            unmount: function () { },
        };
        this.selectors = props.selectors;
        this.emitter = props.emitter || new EventEmitter_1.default();
        this.options = Object.assign(this.options, props.options || {});
        this.on = Object.assign(this.on, props.on || {});
    }
    Component.prototype.mount = function () {
        this.$element.setAttribute('data-mount', 'true');
        this._mount = true;
    };
    Component.prototype.getByName = function (components, name) {
        return components.filter(function (component) { return component.options.name === name; })[0];
    };
    Component.prototype.unmount = function () {
        this._mount = false;
        this.$element.removeAttribute('data-mount');
    };
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=Component.js.map