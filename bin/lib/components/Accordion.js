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
    element: "." + config_1.default.prefix + "-accordion",
    panel: "." + config_1.default.prefix + "-accordion-panel",
    tab: "." + config_1.default.prefix + "-accordion-tab",
    content: "." + config_1.default.prefix + "-accordion-content"
};
var Accordion = /** @class */ (function (_super) {
    __extends(Accordion, _super);
    function Accordion(props) {
        if (props === void 0) { props = {}; }
        var _this = _super.call(this, __assign(__assign({}, props), { Component: Accordion, selectors: Object.assign(selectors, props.selectors || {}) })) || this;
        if (_this.options && _this.options.mount) {
            _this.mount();
        }
        return _this;
    }
    Accordion.prototype.mount = function () {
        if (!this.$element || this._mount || this.$element.hasAttribute('data-mount'))
            return;
        _super.prototype.mount.call(this);
        this.options = Object.assign({
            active: this.$element.dataset.active || false,
            multiple: this.$element.dataset.multiple || false,
            duration: this.$element.dataset.duration || 300
        }, this.options);
        this.on = Object.assign({
            toggle: function () { }
        }, this.on);
        this.handlers = {
            // change: this.change.bind(this),
            resize: this.resize.bind(this),
            toggle: this.toggle.bind(this)
        };
        this.id = 0;
        this.tab = null;
        this.isShow = false;
        this.isShowTabs = [];
        this.$tabs = this.$element.querySelectorAll(this.selectors.tab);
        this.addEvents();
        this.on.mount(this);
        this.emitter.emit('mount', this);
    };
    Accordion.prototype.addEvents = function () {
        var _this = this;
        this.$tabs.forEach(function (tab, i) {
            var panel = tab.closest(_this.selectors.panel);
            var content = panel.querySelector(_this.selectors.content);
            var id = _this.setId(tab);
            content.style.setProperty('transition', "height ease-in-out " + _this.options.duration + "ms");
            _this.isShowTabs.push({ tab: tab, id: id, isShow: false });
            if (_this.options.active && i === 0) {
                _this.toggle(tab, content);
            }
            tab.addEventListener('click', _this.handlers.toggle);
        });
        window.addEventListener('resize', this.handlers.resize);
    };
    Accordion.prototype.unmount = function () {
        var _this = this;
        _super.prototype.unmount.call(this);
        this.$tabs.forEach(function (tab) { return tab.removeEventListener('click', _this.handlers.toggle); });
        window.removeEventListener('resize', this.handlers.resize);
        this.on.unmount(this);
        this.emitter.emit('unmount', this);
    };
    Accordion.prototype.toggle = function (e, cont) {
        var tab = e instanceof HTMLElement ? e : e.target;
        var panel = tab.closest(this.selectors.panel);
        var content = cont || panel.querySelector(this.selectors.content);
        // Если последний активный таб не равен текущему, сбрасываем состояние
        if (this.tab !== tab && !this.options.multiple && this.$tabs.length > 1) {
            this.isShow = false;
            // если в аккордеоне много панелей, скрываем все, кроме текущей
            this.hideAll(tab);
        }
        // Если multiple не вклчюен, то у всех общее состояние
        if (!this.options.multiple) {
            if (this.isShow) {
                this.hide(tab, content);
            }
            else {
                this.show(tab, content);
            }
            this.isShow = !this.isShow;
        }
        else {
            var tabParam = this.isShowTabs.filter(function (param) { return param.tab === tab; })[0];
            if (tabParam.isShow) {
                this.setShowTab(tab, false);
                this.hide(tab, content);
            }
            else {
                this.setShowTab(tab, true);
                this.show(tab, content);
            }
            this.isShow = !this.isShow;
        }
        this.on.toggle(this);
        this.emitter.emit('toggle', this);
    };
    Accordion.prototype.setId = function (tab) {
        tab.setAttribute('data-id', "" + this.id++);
        return this.id;
    };
    Accordion.prototype.show = function (tab, content) {
        var _this = this;
        var height = content.scrollHeight;
        tab.setAttribute('data-active', '');
        // this.$panels.setAttribute('active', '')
        content.setAttribute('showing', '');
        this.setHeight(height + "px", content);
        setTimeout(function () {
            _this.showEnd(tab, content);
        }, this.options.duration);
    };
    Accordion.prototype.showEnd = function (tab, content) {
        content.removeAttribute('showing');
        content.setAttribute('show', '');
        this.emitter.emit('show', this);
        // content.style.setProperty('height', `auto`)
    };
    Accordion.prototype.hide = function (tab, content) {
        var _this = this;
        content.setAttribute('hiding', '');
        tab.removeAttribute('data-active');
        this.setHeight(0, content);
        setTimeout(function () {
            _this.hideEnd(tab, content);
        }, this.options.duration);
    };
    Accordion.prototype.hideEnd = function (tab, content) {
        content.removeAttribute('show');
        content.removeAttribute('hiding');
        // this.$panels.removeAttribute('active')
        this.emitter.emit('hide', tab, content);
    };
    Accordion.prototype.hideAll = function (currentTab) {
        var _this = this;
        if (currentTab) {
            var needTabsHidden = Array.prototype.filter.call(this.$tabs, function (tab) { return tab !== currentTab; });
            needTabsHidden.forEach(function (tab) {
                var panel = tab.closest(_this.selectors.panel);
                var content = panel.querySelector(_this.selectors.content);
                content.removeAttribute('showing');
                content.removeAttribute('show', '');
                content.removeAttribute('hiding');
                tab.removeAttribute('active');
                _this.setHeight(0, content);
            });
            this.tab = currentTab;
        }
        else {
            this.$tabs.forEach(function (tab) {
                var panel = tab.closest(_this.selectors.panel);
                var content = panel.querySelector(_this.selectors.content);
                content.removeAttribute('showing');
                content.removeAttribute('show');
                content.removeAttribute('hiding');
                tab.removeAttribute('active');
                _this.setHeight(0, content);
            });
            this.tab = null;
        }
    };
    Accordion.prototype.setHeight = function (height, content) {
        content.style.setProperty('height', content.scrollHeight + "px");
        window.requestAnimationFrame(function () {
            content.style.setProperty('height', "" + height);
        });
    };
    Accordion.prototype.setShowTab = function (tab, state) {
        var needTab = this.isShowTabs.filter(function (param) { return param.tab === tab; })[0];
        this.isShowTabs = this.isShowTabs.map(function (param) {
            if (param.tab === needTab.tab) {
                param.isShow = state;
            }
            return param;
        });
    };
    Accordion.prototype.resize = function () {
        var _this = this;
        this.$tabs.forEach(function (tab, i) {
            if (!tab.hasAttribute('active'))
                return;
            var panel = tab.closest(_this.selectors.panel);
            var content = panel.querySelector(_this.selectors.content);
            content.style.setProperty('height', "auto");
            _this.setHeight(tab, content);
        });
    };
    return Accordion;
}(Component_1.default));
exports.default = Accordion;
//# sourceMappingURL=Accordion.js.map