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
    element: "." + config_1.default.prefix + "-select",
    wrapper: "." + config_1.default.prefix + "-select-wrapper",
    value: "." + config_1.default.prefix + "-select-value",
    items: "." + config_1.default.prefix + "-select-items",
    item: "." + config_1.default.prefix + "-select-item",
    input: "." + config_1.default.prefix + "-select-input",
    current: "." + config_1.default.prefix + "-select-current",
};
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select(props) {
        if (props === void 0) { props = {}; }
        var _this = _super.call(this, __assign(__assign({}, props), { Component: Select, selectors: Object.assign(selectors, props.selectors || {}) })) || this;
        if (_this.options && _this.options.mount) {
            _this.mount();
        }
        return _this;
    }
    Select.prototype.mount = function () {
        if (!this.$element || this._mount || this.$element.hasAttribute('data-mount'))
            return;
        _super.prototype.mount.call(this);
        this.options = Object.assign({
            active: this.$element.dataset.active || false
        }, this.options);
        this.on = Object.assign({
            toggle: function () { },
            change: function () { }
        }, this.on);
        this.handlers = {
            toggle: this.toggle.bind(this),
            documentClickHandler: this.documentClickHandler.bind(this),
            change: this.change.bind(this)
        };
        this.value = this.options && this.options.value || null;
        this.items = this.options && this.options.items || null;
        this.$input = this.$element.querySelector(this.selectors.input);
        this.$value = this.$element.querySelector(this.selectors.value);
        this.$items = this.$element.querySelector(this.selectors.items);
        this.$itemList = this.$items.querySelectorAll(this.selectors.item);
        this.addEvents();
        this.on.mount(this);
        this.emitter.emit('mount', this);
    };
    Select.prototype.addEvents = function () {
        var _this = this;
        this.$value.addEventListener('click', this.handlers.toggle);
        document.addEventListener('click', this.handlers.documentClickHandler);
        this.$itemList.forEach(function ($item) { return $item.addEventListener('click', _this.handlers.change); });
    };
    Select.prototype.documentClickHandler = function (e) {
        if (!e.target.closest(this.selectors.element) && this.$element.hasAttribute('data-active')) {
            this.$element.toggleAttribute('data-active');
            this.on.toggle(this);
            this.emitter.emit('toggle', this);
        }
    };
    Select.prototype.toggle = function () {
        this.$element.toggleAttribute('data-active');
        this.on.toggle(this);
        this.emitter.emit('toggle', this);
    };
    Select.prototype.close = function () {
        this.$element.removeAttribute('data-active');
    };
    Select.prototype.change = function (e) {
        var $current = this.$items.querySelector('[data-selected]');
        var $item = e.target.closest(this.selectors.item);
        var value = $item.dataset.value.trim();
        var label = $item.innerHTML.toString().trim();
        if ($item.hasAttribute('data-selected')) {
            return;
        }
        if ($current) {
            $current.removeAttribute('data-selected');
        }
        $item.setAttribute('data-selected', '');
        this.value = {
            value: value,
            label: label
        };
        this.$input.value = value;
        this.$value.setAttribute('data-value', value);
        this.$value.innerHTML = label;
        this.close();
        this.on.change(this);
        this.emitter.emit('change', this);
    };
    Select.prototype.unmount = function () {
        _super.prototype.unmount.call(this);
        this.on.unmount(this);
        this.emitter.emit('unmount', this);
    };
    return Select;
}(Component_1.default));
exports.default = Select;
//# sourceMappingURL=Select.js.map