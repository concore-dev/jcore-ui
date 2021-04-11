"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var config_1 = __importDefault(require("../../config"));
var Component_1 = __importDefault(require("../core/Component"));
var selectors = {
    element: "." + config_1.default.prefix + "-dropdown",
    content: "." + config_1.default.prefix + "-dropdown-content",
    wrapper: "." + config_1.default.prefix + "-dropdown-wrapper",
    header: "." + config_1.default.prefix + "-dropdown-header"
};
var Dropdown = /** @class */ (function (_super) {
    __extends(Dropdown, _super);
    function Dropdown(props) {
        if (props === void 0) { props = {}; }
        var _this = _super.call(this, __assign(__assign({}, props), { Component: Dropdown, selectors: Object.assign(selectors, props.selectors || {}) })) || this;
        if (_this.options && _this.options.mount) {
            _this.mount();
        }
        return _this;
    }
    Dropdown.prototype.mount = function () {
        if (!this.$element || this._mount || this.$element.hasAttribute('data-mount'))
            return;
        _super.prototype.mount.call(this);
        this.options = Object.assign({}, this.options);
        this.handlers = {
            documentClickHandler: this.documentClickHandler.bind(this),
            clickHandler: this.clickHandler.bind(this)
        };
        this.addEvents();
        this.on.mount(this);
        this.emitter.emit('mount', this);
    };
    Dropdown.prototype.addEvents = function () {
        this.$element.addEventListener('click', this.handlers.clickHandler);
        document.addEventListener('click', this.handlers.documentClickHandler);
    };
    Dropdown.prototype.documentClickHandler = function (e) {
        if (!e.target.closest(this.selectors.element) && this.$element.hasAttribute('data-active')) {
            this.$element.toggleAttribute('data-active');
            this.on.destroy(this);
            this.emitter.emit('destroy', this);
        }
    };
    Dropdown.prototype.clickHandler = function () {
        this.$element.toggleAttribute('data-active');
        if (this.$element.hasAttribute('data-active')) {
            this.on.render(this);
            this.emitter.emit('render', this);
        }
        else {
            this.on.destroy(this);
            this.emitter.emit('destroy', this);
        }
    };
    Dropdown.prototype.unmount = function () {
        _super.prototype.unmount.call(this);
        document.removeEventListener('click', this.handlers.documentClickHandler);
        this.$element.removeEventListener('click', this.handlers.clickHandler);
        this.on.unmount(this);
        this.emitter.emit('unmount', this);
    };
    return Dropdown;
}(Component_1.default));
exports.default = Dropdown;
//# sourceMappingURL=Dropdown.js.map