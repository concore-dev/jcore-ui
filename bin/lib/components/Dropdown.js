"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const Component_1 = __importDefault(require("../core/Component"));
const selectors = {
    element: `.${config_1.default.prefix}-dropdown`,
    content: `.${config_1.default.prefix}-dropdown-content`,
    wrapper: `.${config_1.default.prefix}-dropdown-wrapper`,
    header: `.${config_1.default.prefix}-dropdown-header`
};
class Dropdown extends Component_1.default {
    constructor(props = {}) {
        super({
            ...props,
            Component: Dropdown,
            selectors: Object.assign(selectors, props.selectors || {})
        });
        if (this.options && this.options.mount) {
            this.mount();
        }
    }
    mount() {
        if (!this.$element || this._mount || this.$element.hasAttribute('data-mount'))
            return;
        super.mount();
        this.options = Object.assign({}, this.options);
        this.handlers = {
            documentClickHandler: this.documentClickHandler.bind(this),
            clickHandler: this.clickHandler.bind(this)
        };
        this.addEvents();
        this.on.mount(this);
        this.emitter.emit('mount', this);
    }
    addEvents() {
        this.$element.addEventListener('click', this.handlers.clickHandler);
        document.addEventListener('click', this.handlers.documentClickHandler);
    }
    documentClickHandler(e) {
        if (!e.target.closest(this.selectors.element) && this.$element.hasAttribute('data-active')) {
            this.$element.toggleAttribute('data-active');
            this.on.destroy(this);
            this.emitter.emit('destroy', this);
        }
    }
    clickHandler() {
        this.$element.toggleAttribute('data-active');
        if (this.$element.hasAttribute('data-active')) {
            this.on.render(this);
            this.emitter.emit('render', this);
        }
        else {
            this.on.destroy(this);
            this.emitter.emit('destroy', this);
        }
    }
    unmount() {
        super.unmount();
        document.removeEventListener('click', this.handlers.documentClickHandler);
        this.$element.removeEventListener('click', this.handlers.clickHandler);
        this.on.unmount(this);
        this.emitter.emit('unmount', this);
    }
}
exports.default = Dropdown;
//# sourceMappingURL=Dropdown.js.map