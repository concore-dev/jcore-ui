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
    element: "." + config_1.default.prefix + "-tabs",
    list: "." + config_1.default.prefix + "-tabs-list",
    tab: "." + config_1.default.prefix + "-tab",
    wrapper: "." + config_1.default.prefix + "-tab-wrapper",
    content: "." + config_1.default.prefix + "-tab-content"
};
var Tab = /** @class */ (function (_super) {
    __extends(Tab, _super);
    function Tab(props) {
        if (props === void 0) { props = {}; }
        var _this = _super.call(this, __assign(__assign({}, props), { Component: Tab, selectors: Object.assign(selectors, props.selectors || {}) })) || this;
        if (_this.options && _this.options.mount) {
            _this.mount();
        }
        return _this;
    }
    Tab.prototype.mount = function () {
        var _this = this;
        if (!this.$element || this._mount || this.$element.hasAttribute('data-mount'))
            return;
        _super.prototype.mount.call(this);
        this.options = Object.assign({
            active: this.$element.dataset.active || false
        }, this.options);
        this.on = Object.assign({
            toggle: function () { }
        }, this.on);
        this.handlers = {
            change: this.change.bind(this),
        };
        this.$tabs = this.$element.querySelectorAll(this.selectors.tab);
        this.$contents = this.$element.querySelectorAll(this.selectors.content);
        this.addEvents();
        if (this.options.active) {
            this.toggle(this.$tabs[0], Array.prototype.filter.call(this.$contents, function (item) { return item.dataset.tab === _this.$tabs[0].dataset.target; })[0], false);
        }
        this.on.mount(this);
        this.emitter.emit('mount', this);
    };
    Tab.prototype.addEvents = function () {
        var _this = this;
        this.$tabs.forEach(function (tab) { return tab.addEventListener('click', _this.handlers.change); });
    };
    Tab.prototype.change = function (e) {
        var tab = e.target;
        var content = Array.prototype.filter.call(this.$contents, function (item) { return item.dataset.tab === e.target.dataset.target; })[0];
        if (!tab.hasAttribute('data-active') || !content.hasAttribute('data-active')) {
            this.toggle(tab, content);
        }
    };
    Tab.prototype.toggle = function (tab, content, lifeCycle) {
        if (lifeCycle === void 0) { lifeCycle = true; }
        this.$tabs.forEach(function (item) { return item.removeAttribute('data-active'); });
        this.$contents.forEach(function (item) { return item.removeAttribute('data-active'); });
        tab.toggleAttribute('data-active');
        content.toggleAttribute('data-active');
        if (lifeCycle) {
            this.emitter.emit('toggle', this);
            this.on.toggle(this);
        }
    };
    Tab.prototype.unmount = function () {
        var _this = this;
        _super.prototype.unmount.call(this);
        this.$tabs.forEach(function (tab) { return tab.removeEventListener('click', _this.handlers.change); });
        this.on.unmount(this);
        this.emitter.emit('unmount', this);
    };
    return Tab;
}(Component_1.default));
exports.default = Tab;
//# sourceMappingURL=Tab.js.map