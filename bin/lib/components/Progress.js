"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = __importDefault(require("../core/Component"));
const config_1 = __importDefault(require("../../config"));
const selectors = {
    element: `.${config_1.default.prefix}-progress`,
    percent: `.${config_1.default.prefix}-progress-percent`,
    bar: `.${config_1.default.prefix}-progress-bar`
};
class Progress extends Component_1.default {
    constructor(props = {}) {
        super({
            ...props,
            Component: Progress,
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
            percent: this.$element.dataset.percent || 0,
            type: this.$element.dataset.type || 'line',
        }, this.options);
        this.handlers = {
            change: this.change.bind(this)
        };
        this.$percent = this.$element.querySelector(this.selectors.percent);
        this.$bar = this.$element.querySelector(this.selectors.bar);
        this.addEvents();
        this.on.mount(this);
        this.emitter.emit('mount', this);
    }
    addEvents() {
        this.change(this.getPercent(), false);
    }
    // unmount() {
    //     super.unmount()
    //     this.on.unmount(this)
    //     this.emitter.emit('unmount', this)
    // }
    change(value, lifecycle = true) {
        if (value >= 100) {
            this.options.percent = 100;
        }
        else if (value <= 0) {
            this.options.percent = 0;
        }
        else {
            this.options.percent = value;
        }
        if (this.options.type === 'line') {
            this.$bar.setAttribute('style', `width:${this.options.percent}%`);
            this.$percent.innerText = this.options.percent + '%';
        }
        else if (this.options.type === 'ring') {
        }
        if (lifecycle) {
            this.on.change(this);
            this.emitter.emit('change', this);
        }
    }
    getPercent() {
        return this.options.percent;
    }
}
exports.default = Progress;
//# sourceMappingURL=Progress.js.map