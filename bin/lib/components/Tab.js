"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = __importDefault(require("../core/Component"));
const config_1 = __importDefault(require("../../config"));
const selectors = {
    element: `.${config_1.default.prefix}-tabs`,
    list: `.${config_1.default.prefix}-tabs-list`,
    tab: `.${config_1.default.prefix}-tab`,
    wrapper: `.${config_1.default.prefix}-tab-wrapper`,
    content: `.${config_1.default.prefix}-tab-content`
};
class Tab extends Component_1.default {
    constructor(props = {}) {
        super({
            ...props,
            Component: Tab,
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
            active: this.$element.dataset.active || false
        }, this.options);
        this.on = Object.assign({
            toggle: () => { }
        }, this.on);
        this.handlers = {
            change: this.change.bind(this),
        };
        this.$tabs = this.$element.querySelectorAll(this.selectors.tab);
        this.$contents = this.$element.querySelectorAll(this.selectors.content);
        this.addEvents();
        if (this.options.active) {
            this.toggle(this.$tabs[0], Array.prototype.filter.call(this.$contents, item => item.dataset.tab === this.$tabs[0].dataset.target)[0], false);
        }
        this.on.mount(this);
        this.emitter.emit('mount', this);
    }
    addEvents() {
        this.$tabs.forEach(tab => tab.addEventListener('click', this.handlers.change));
    }
    change(e) {
        const tab = e.target;
        const content = Array.prototype.filter.call(this.$contents, item => item.dataset.tab === e.target.dataset.target)[0];
        if (!tab.hasAttribute('data-active') || !content.hasAttribute('data-active')) {
            this.toggle(tab, content);
        }
    }
    toggle(tab, content, lifeCycle = true) {
        this.$tabs.forEach(item => item.removeAttribute('data-active'));
        this.$contents.forEach(item => item.removeAttribute('data-active'));
        tab.toggleAttribute('data-active');
        content.toggleAttribute('data-active');
        if (lifeCycle) {
            this.emitter.emit('toggle', this);
            this.on.toggle(this);
        }
    }
    unmount() {
        super.unmount();
        this.$tabs.forEach(tab => tab.removeEventListener('click', this.handlers.change));
        this.on.unmount(this);
        this.emitter.emit('unmount', this);
    }
}
exports.default = Tab;
//# sourceMappingURL=Tab.js.map