"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = __importDefault(require("../core/Component"));
const config_1 = __importDefault(require("../../config"));
const createTemplate_1 = __importDefault(require("../utils/createTemplate"));
const event_1 = __importDefault(require("../utils/event"));
const selectors = {
    element: `.${config_1.default.prefix}-modal`,
    overlay: `.${config_1.default.prefix}-modal-overlay`,
    content: `.${config_1.default.prefix}-modal-content`,
    close: `.${config_1.default.prefix}-modal-close`,
    btnTarget: `data-modal-target`,
};
class Modal extends Component_1.default {
    constructor(props = {}) {
        super({
            ...props,
            Component: Modal,
            selectors: Object.assign(selectors, props.selectors || {})
        });
        this.props = props;
        if (this.options && this.options.mount) {
            this.mount();
        }
    }
    mount() {
        if (!this.$element || this._mount || this.$element.hasAttribute('data-mount'))
            return;
        super.mount();
        this.options = Object.assign({
            adaptive: this.$element.dataset.adaptive || true,
            // type: this.$element.dataset.type || 'line',
        }, this.options);
        this.handlers = {
        // change: this.change.bind(this)
        };
        this.isRender = false;
        this.$overlay = createTemplate_1.default(`<div class="${this.selectors.overlay.replace('.', '')}"></div>`);
        this.$close = this.$element.querySelector(this.selectors.close);
        this.$btnTarget = this.props.elements && this.props.elements.$btnTarget || document.querySelector(`[${this.selectors.btnTarget}="${this.options.name}"]`);
        this.$container = this.props.elements && this.props.elements.$container || document.querySelector(`body`);
        this.addEvents();
        this.on.mount(this);
        this.emitter.emit('mount', this);
    }
    addEvents() {
        if (this.options.adaptive) {
            this.$element.setAttribute('data-adaptive', '');
        }
        if (this.$btnTarget) {
            this.$btnTarget.addEventListener('click', e => this.render());
        }
        this.$overlay.addEventListener('click', this.destroy.bind(this));
        this.$close.addEventListener('click', this.destroy.bind(this));
    }
    unmount() {
        super.unmount();
        this.on.unmount(this);
        this.emitter.emit('unmount', this);
    }
    render() {
        document.querySelector('body').style.setProperty('overflow', 'hidden');
        this.$container.appendChild(this.$overlay);
        this.$container.appendChild(this.$element);
        this.isRender = true;
        this.on.render(this);
        this.emitter.emit('render', this);
        setTimeout(() => {
            this.$overlay.setAttribute('data-active', '');
            this.$element.setAttribute('data-active', '');
        }, 10);
    }
    destroy() {
        if (!this.isRender) {
            return;
        }
        this.$overlay.addEventListener(event_1.default.transitionEnd(), () => {
            this.$overlay.removeAttribute('data-closing');
            this.$element.removeAttribute('data-closing');
            this.$overlay.removeAttribute('data-active');
            this.$element.removeAttribute('data-active');
            this.$overlay.remove();
            this.$element.remove();
        }, { once: true });
        this.$overlay.setAttribute('data-closing', '');
        this.$element.setAttribute('data-closing', '');
        this.isRender = false;
        this.on.destroy(this);
        this.emitter.emit('destroy', this);
        document.querySelector('body').style.removeProperty('overflow');
    }
}
exports.default = Modal;
//# sourceMappingURL=Modal.js.map