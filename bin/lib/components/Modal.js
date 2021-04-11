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
var createTemplate_1 = __importDefault(require("../utils/createTemplate"));
var event_1 = __importDefault(require("../utils/event"));
var selectors = {
    element: "." + config_1.default.prefix + "-modal",
    overlay: "." + config_1.default.prefix + "-modal-overlay",
    content: "." + config_1.default.prefix + "-modal-content",
    close: "." + config_1.default.prefix + "-modal-close",
    btnTarget: "data-modal-target",
};
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal(props) {
        if (props === void 0) { props = {}; }
        var _this = _super.call(this, __assign(__assign({}, props), { Component: Modal, selectors: Object.assign(selectors, props.selectors || {}) })) || this;
        _this.props = props;
        if (_this.options && _this.options.mount) {
            _this.mount();
        }
        return _this;
    }
    Modal.prototype.mount = function () {
        if (!this.$element || this._mount || this.$element.hasAttribute('data-mount'))
            return;
        _super.prototype.mount.call(this);
        this.options = Object.assign({
            adaptive: this.$element.dataset.adaptive || true,
            // type: this.$element.dataset.type || 'line',
        }, this.options);
        this.handlers = {
        // change: this.change.bind(this)
        };
        this.isRender = false;
        this.$overlay = createTemplate_1.default("<div class=\"" + this.selectors.overlay.replace('.', '') + "\"></div>");
        this.$close = this.$element.querySelector(this.selectors.close);
        this.$btnTarget = this.props.elements && this.props.elements.$btnTarget || document.querySelector("[" + this.selectors.btnTarget + "=\"" + this.options.name + "\"]");
        this.$container = this.props.elements && this.props.elements.$container || document.querySelector("body");
        this.addEvents();
        this.on.mount(this);
        this.emitter.emit('mount', this);
    };
    Modal.prototype.addEvents = function () {
        var _this = this;
        if (this.options.adaptive) {
            this.$element.setAttribute('data-adaptive', '');
        }
        if (this.$btnTarget) {
            this.$btnTarget.addEventListener('click', function (e) { return _this.render(); });
        }
        this.$overlay.addEventListener('click', this.destroy.bind(this));
        this.$close.addEventListener('click', this.destroy.bind(this));
    };
    Modal.prototype.unmount = function () {
        _super.prototype.unmount.call(this);
        this.on.unmount(this);
        this.emitter.emit('unmount', this);
    };
    Modal.prototype.render = function () {
        var _this = this;
        document.querySelector('body').style.setProperty('overflow', 'hidden');
        this.$container.appendChild(this.$overlay);
        this.$container.appendChild(this.$element);
        this.isRender = true;
        this.on.render(this);
        this.emitter.emit('render', this);
        setTimeout(function () {
            _this.$overlay.setAttribute('data-active', '');
            _this.$element.setAttribute('data-active', '');
        }, 10);
    };
    Modal.prototype.destroy = function () {
        var _this = this;
        if (!this.isRender) {
            return;
        }
        this.$overlay.addEventListener(event_1.default.transitionEnd(), function () {
            _this.$overlay.removeAttribute('data-closing');
            _this.$element.removeAttribute('data-closing');
            _this.$overlay.removeAttribute('data-active');
            _this.$element.removeAttribute('data-active');
            _this.$overlay.remove();
            _this.$element.remove();
        }, { once: true });
        this.$overlay.setAttribute('data-closing', '');
        this.$element.setAttribute('data-closing', '');
        this.isRender = false;
        this.on.destroy(this);
        this.emitter.emit('destroy', this);
        document.querySelector('body').style.removeProperty('overflow');
    };
    return Modal;
}(Component_1.default));
exports.default = Modal;
//# sourceMappingURL=Modal.js.map