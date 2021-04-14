"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = __importDefault(require("../core/Component"));
const config_1 = __importDefault(require("../../config"));
const selectors = {
    element: `.${config_1.default.prefix}-select`,
    wrapper: `.${config_1.default.prefix}-select-wrapper`,
    value: `.${config_1.default.prefix}-select-value`,
    items: `.${config_1.default.prefix}-select-items`,
    item: `.${config_1.default.prefix}-select-item`,
    input: `.${config_1.default.prefix}-select-input`,
    current: `.${config_1.default.prefix}-select-current`,
};
class Select extends Component_1.default {
    constructor(props = {}) {
        super({
            ...props,
            Component: Select,
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
        this.options = Object.assign({
        // active: this.$element.dataset.active || false
        }, this.options);
        this.on = Object.assign({
            toggle: () => { },
            change: () => { }
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
    }
    addEvents() {
        this.$value.addEventListener('click', this.handlers.toggle);
        document.addEventListener('click', this.handlers.documentClickHandler);
        this.$itemList.forEach($item => $item.addEventListener('click', this.handlers.change));
    }
    documentClickHandler(e) {
        if (!e.target.closest(this.selectors.element) && this.$element.hasAttribute('data-active')) {
            this.$element.toggleAttribute('data-active');
            this.on.toggle(this);
            this.emitter.emit('toggle', this);
        }
    }
    toggle() {
        this.$element.toggleAttribute('data-active');
        this.on.toggle(this);
        this.emitter.emit('toggle', this);
    }
    close() {
        this.$element.removeAttribute('data-active');
    }
    change(e) {
        const $current = this.$items.querySelector('[data-selected]');
        const $item = e.target.closest(this.selectors.item);
        const value = $item.dataset.value.trim();
        const label = $item.innerHTML.toString().trim();
        if ($item.hasAttribute('data-selected')) {
            return;
        }
        if ($current) {
            $current.removeAttribute('data-selected');
        }
        $item.setAttribute('data-selected', '');
        this.value = {
            value,
            label
        };
        this.$input.value = value;
        this.$value.setAttribute('data-value', value);
        this.$value.innerHTML = label;
        this.close();
        this.on.change(this);
        this.emitter.emit('change', this);
    }
    unmount() {
        super.unmount();
        this.on.unmount(this);
        this.emitter.emit('unmount', this);
    }
}
exports.default = Select;
//# sourceMappingURL=Select.js.map