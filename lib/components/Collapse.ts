import Component, { IComponent, IComponentOn, IComponentOptions, IComponentSelector } from "../core/Component";
import config from '../../config';


const selectors = {
    element: `.${config.prefix}-collapse`,
    wrapper: `.${config.prefix}-collapse-wrapper`,
    button: `.${config.prefix}-collapse-button`
}


interface ICollapseSelector extends IComponentSelector {
    wrapper: string
    button: string
}


interface ICollapseOptions extends IComponentOptions {
    height?: number
    duration?: number
}


interface ICollapseOn extends IComponentOn {
    toggle?: (ctx?: Component) => void;
}


interface ICollapse extends IComponent {
    selectors?: ICollapseSelector
    options?: ICollapseOptions
    on?: ICollapseOn
}


interface Collapse {
    selectors: ICollapseSelector
    $wrapper: HTMLElement
    $button: HTMLElement
    options: ICollapseOptions;
    isActive: boolean
    scrollHeight: number
    on: ICollapseOn
}


class Collapse extends Component {
    constructor(props: ICollapse = {}) {
        super({
            ...props,
            Component: Collapse,
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
            height: this.$element.dataset.height || 0,
            duration: this.$element.dataset.duration || 300,
        }, this.options)

        this.handlers = {
            toggle: this.toggle.bind(this),
            resize: this.resize.bind(this)
        }

        this.on = Object.assign({
            toggle: () => {}
        }, this.on)

        this.$wrapper = this.$element.querySelector(this.selectors.wrapper)
        this.$button = this.$element.querySelector(this.selectors.button)

        this.isActive = false;
        this.scrollHeight = this.$wrapper.scrollHeight;

        this.addEvents()

        this.on.mount(this)
        this.emitter.emit('mount', this)
    }

    addEvents() {
        this.$wrapper.style.setProperty('max-height', `${this.options.height}px`)
        this.$wrapper.style.setProperty('transition', `all ease-in-out ${this.options.duration}ms`)

        this.$button.addEventListener('click',this.handlers.toggle)
        window.addEventListener('resize', this.handlers.resize)

        this.initButtonByHeight()
    }

    unmount() {
        super.unmount()

        this.$button.removeEventListener('click',this.handlers.toggle)
        window.removeEventListener('resize', this.handlers.resize)

        this.$button.removeAttribute('data-mount')

        this.on.unmount(this)
        this.emitter.emit('unmount', this)
    }

    toggle() {
        if (this.isActive) {
            this.close()
        } else {
            this.open()
        }

        this.emitter.emit('toggle', this)
        this.on.toggle(this)
    }

    open() {
        this.$button.setAttribute('active', '')
        this.$element.setAttribute('active', '')
        this.$wrapper.setAttribute('active', '')
        this.$wrapper.style.setProperty('max-height', `${this.scrollHeight}px`)

        this.isActive = true;
    }

    close() {
        this.$button.removeAttribute('active')
        this.$element.removeAttribute('active')
        this.$wrapper.removeAttribute('active')
        this.$wrapper.style.setProperty('max-height', `${this.options.height}px`)

        this.isActive = false;
    }

    resize() {
        this.scrollHeight = this.$wrapper.scrollHeight;

        if (this.isActive) {
            this.$wrapper.style.setProperty('max-height', `${this.scrollHeight}px`)
        } else {
            this.$wrapper.style.setProperty('max-height', `${this.options.height}px`)
        }

        this.initButtonByHeight()
    }

    initButtonByHeight() {
        if (this.scrollHeight < this.options.height) {
            this.$button.removeAttribute('data-mount')
        } else {
            this.$button.setAttribute('data-mount', '')
        }
    }
}


export default Collapse;