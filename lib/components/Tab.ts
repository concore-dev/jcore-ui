import { IComponent, IComponentOn, IComponentOptions, IComponentSelector } from '../core/Component';
import Component from "../core/Component";
import config from '../../config';


const selectors = {
    element: `.${config.prefix}-tabs`,
    list: `.${config.prefix}-tabs-list`,
    tab: `.${config.prefix}-tab`,
    wrapper: `.${config.prefix}-tab-wrapper`,
    content: `.${config.prefix}-tab-content`
}


interface ITabSelector extends IComponentSelector {
    list: string;
    tab: string;
    wrapper: string;
    content: string;
}


interface ITabOptions extends IComponentOptions {
    active?: boolean
}


interface ITabOn extends IComponentOn {
    toggle?: (ctx?: Component) => void;
}


interface ITab extends IComponent {
    selectors?: ITabSelector
    options?: ITabOptions
    on?: ITabOn
}


interface Tab {
    // handlers?: IObject;
    options: ITabOptions;
    $list: HTMLElement
    $tabs: NodeListOf<HTMLElement> | Array<Element>
    $contents: NodeListOf<HTMLElement> | Array<Element>
    selectors: ITabSelector
    on: ITabOn
}


class Tab extends Component {
    constructor(props: ITab = {}) {
        super({
            ...props,
            Component: Tab,
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
            active: this.$element.dataset.active || false
        }, this.options)

        this.on = Object.assign({
            toggle: () => {}
        }, this.on)

        this.handlers = {
            change: this.change.bind(this),
        }

        this.$tabs = Array.from(this.$element.querySelector(this.selectors.list).children);
        this.$contents = Array.from(this.$element.querySelector(this.selectors.wrapper).children)

        this.addEvents()

        if (this.options.active) {
            this.toggle(this.$tabs[0] as HTMLElement, Array.prototype.filter.call(this.$contents, item => item.dataset.tab === this.$tabs[0].dataset.target)[0], false)
        }

        this.on.mount(this)
        this.emitter.emit('mount', this)
    }

    addEvents() {
        this.$tabs.forEach((tab: Element) => tab.addEventListener('click', this.handlers.change))
    }

    change(e: Event) {
        const tab = e.target as HTMLElement;
        const content = Array.prototype.filter.call(this.$contents, item => item.dataset.tab === e.target.dataset.target)[0]

        if (!tab.hasAttribute('data-active') || !content.hasAttribute('data-active')) {
            this.toggle(tab, content)
        }
    }

    toggle(tab: HTMLElement, content: HTMLElement, lifeCycle: boolean = true) {
        this.$tabs.forEach((item: Element) => item.removeAttribute('data-active'))
        this.$contents.forEach((item: Element) => item.removeAttribute('data-active'))

        tab.toggleAttribute('data-active')
        content.toggleAttribute('data-active')

        if (lifeCycle) {
            this.emitter.emit('toggle', this)
            this.on.toggle(this)
        }
    }

    unmount() {
        super.unmount()

        this.$tabs.forEach((tab: Element) => tab.removeEventListener('click', this.handlers.change))

        this.on.unmount(this)
        this.emitter.emit('unmount', this)
    }
}


export default Tab