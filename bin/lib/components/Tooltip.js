"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const Component_1 = __importDefault(require("../core/Component"));
const selectors = {
    element: `.${config_1.default.prefix}-tooltip`,
    content: `.${config_1.default.prefix}-tooltip-content`,
    wrapper: `.${config_1.default.prefix}-tooltip-wrapper`,
    header: `.${config_1.default.prefix}-tooltip-header`
};
class Tooltip extends Component_1.default {
    constructor(props = {}) {
        super({
            ...props,
            Component: Tooltip,
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
            mouseOverHandler: this.mouseOverHandler.bind(this),
            mouseOutHandler: this.mouseOutHandler.bind(this),
            clickHandler: this.clickHandler.bind(this),
        };
        this.addEvents();
        this.on.mount(this);
        this.emitter.emit('mount', this);
    }
    addEvents() {
        this.$element.addEventListener('mouseover', this.handlers.mouseOverHandler);
        this.$element.addEventListener('mouseout', this.handlers.mouseOutHandler);
        this.$element.addEventListener('click', this.handlers.clickHandler);
    }
    mouseOverHandler() {
        this.$element.toggleAttribute('data-active');
        this.on.render(this);
        this.emitter.emit('render', this);
    }
    mouseOutHandler() {
        this.$element.removeAttribute('data-active');
        this.on.destroy(this);
        this.emitter.emit('destroy', this);
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
        this.$element.removeEventListener('mouseover', this.handlers.mouseOverHandler);
        this.$element.removeEventListener('mouseout', this.handlers.mouseOutHandler);
        this.$element.removeEventListener('click', this.handlers.clickHandler);
        this.on.unmount(this);
        this.emitter.emit('unmount', this);
    }
}
exports.default = Tooltip;
//# sourceMappingURL=Tooltip.js.map