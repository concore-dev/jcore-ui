import Component, { IComponent, IComponentOn, IComponentOptions, IComponentSelector } from "../core/Component";
import config from '../../config';

const selectors = {
    element: `.${config.prefix}-progress`,
    percent: `.${config.prefix}-progress-percent`,
    bar: `.${config.prefix}-progress-bar`
}

interface IProgressSelector extends IComponentSelector {
    percent: string
    bar: string
}

interface ICollapseOptions extends IComponentOptions {
    percent?: number
    type?: string,
}

interface ICollapseOn extends IComponentOn {
    change?: (ctx?: Component) => void;
}

interface ICollapse extends IComponent {
    selectors?: IProgressSelector
    options?: ICollapseOptions
    on?: ICollapseOn
}

interface Progress {
    selectors: IProgressSelector
    $percent: HTMLElement
    $bar: HTMLElement
    options: ICollapseOptions;
    on: ICollapseOn
}

class Progress extends Component {
    constructor(props: ICollapse = {}) {
        super({
            ...props,
            Component: Progress,
            selectors: Object.assign(selectors, props.selectors || {})
        })

        if (this.options && this.options.mount) {
            this.mount()
        }
    }

    mount() {
        if (!this.$element || this._mount || this.$element.hasAttribute('data-mount')) return;
        super.mount()

        this.options = Object.assign({
            percent: this.$element.dataset.percent || 0,
            type: this.$element.dataset.type || 'line',
        }, this.options)

        this.handlers = {
            change: this.change.bind(this)
        }

        this.$percent = this.$element.querySelector(this.selectors.percent)
        this.$bar = this.$element.querySelector(this.selectors.bar)

        this.addEvents()

        this.on.mount(this)
        this.emitter.emit('mount', this)
    }

    addEvents() {
        this.change(this.getPercent(), false)
    }

    // unmount() {
    //     super.unmount()

    //     this.on.unmount(this)
    //     this.emitter.emit('unmount', this)
    // }

    change(value: number, lifecycle: boolean = true) {
        if (value >= 100) {
            this.options.percent = 100;
        } else if (value <= 0) {
            this.options.percent = 0;
        } else {
            this.options.percent = value;
        }

        if (this.options.type === 'line') {
            this.$bar.setAttribute('style', `width:${this.options.percent}%`);
            this.$percent.innerText = this.options.percent + '%';

        } else if (this.options.type === 'ring') {

        }

        if (lifecycle) {
            this.on.change(this)
            this.emitter.emit('change', this)
        }
    }

    getPercent() {
        return this.options.percent;
    }
}

export default Progress