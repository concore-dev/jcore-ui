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
var Component_1 = __importDefault(require("../core/Component"));
var config_1 = __importDefault(require("../../config"));
var selectors = {
    element: "." + config_1.default.prefix + "-collapse",
    wrapper: "." + config_1.default.prefix + "-collapse-wrapper",
    button: "." + config_1.default.prefix + "-collapse-button"
};
var Collapse = /** @class */ (function (_super) {
    __extends(Collapse, _super);
    function Collapse(props) {
        if (props === void 0) { props = {}; }
        var _this = _super.call(this, __assign(__assign({}, props), { Component: Collapse, selectors: Object.assign(selectors, props.selectors || {}) })) || this;
        if (_this.options && _this.options.mount) {
            _this.mount();
        }
        return _this;
    }
    Collapse.prototype.mount = function () {
        if (!this.$element || this._mount || this.$element.hasAttribute('data-mount'))
            return;
        _super.prototype.mount.call(this);
        this.options = Object.assign({
            height: this.$element.dataset.height || 0,
            duration: this.$element.dataset.duration || 300,
        }, this.options);
        this.handlers = {
            toggle: this.toggle.bind(this),
            resize: this.resize.bind(this)
        };
        this.on = Object.assign({
            toggle: function () { }
        }, this.on);
        this.$wrapper = this.$element.querySelector(this.selectors.wrapper);
        this.$button = this.$element.querySelector(this.selectors.button);
        this.isActive = false;
        this.scrollHeight = this.$wrapper.scrollHeight;
        this.addEvents();
        this.on.mount(this);
        this.emitter.emit('mount', this);
    };
    Collapse.prototype.addEvents = function () {
        this.$wrapper.style.setProperty('max-height', this.options.height + "px");
        this.$wrapper.style.setProperty('transition', "all ease-in-out " + this.options.duration + "ms");
        this.$button.addEventListener('click', this.handlers.toggle);
        window.addEventListener('resize', this.handlers.resize);
        this.initButtonByHeight();
    };
    Collapse.prototype.unmount = function () {
        _super.prototype.unmount.call(this);
        this.$button.removeEventListener('click', this.handlers.toggle);
        window.removeEventListener('resize', this.handlers.resize);
        this.$button.removeAttribute('data-mount');
        this.on.unmount(this);
        this.emitter.emit('unmount', this);
    };
    Collapse.prototype.toggle = function () {
        if (this.isActive) {
            this.close();
        }
        else {
            this.open();
        }
        this.emitter.emit('toggle', this);
        this.on.toggle(this);
    };
    Collapse.prototype.open = function () {
        this.$button.setAttribute('active', '');
        this.$element.setAttribute('active', '');
        this.$wrapper.setAttribute('active', '');
        this.$wrapper.style.setProperty('max-height', this.scrollHeight + "px");
        this.isActive = true;
    };
    Collapse.prototype.close = function () {
        this.$button.removeAttribute('active');
        this.$element.removeAttribute('active');
        this.$wrapper.removeAttribute('active');
        this.$wrapper.style.setProperty('max-height', this.options.height + "px");
        this.isActive = false;
    };
    Collapse.prototype.resize = function () {
        this.scrollHeight = this.$wrapper.scrollHeight;
        if (this.isActive) {
            this.$wrapper.style.setProperty('max-height', this.scrollHeight + "px");
        }
        else {
            this.$wrapper.style.setProperty('max-height', this.options.height + "px");
        }
        this.initButtonByHeight();
    };
    Collapse.prototype.initButtonByHeight = function () {
        if (this.scrollHeight < this.options.height) {
            this.$button.removeAttribute('data-mount');
        }
        else {
            this.$button.setAttribute('data-mount', '');
        }
    };
    return Collapse;
}(Component_1.default));
exports.default = Collapse;
//# sourceMappingURL=Collapse.js.map