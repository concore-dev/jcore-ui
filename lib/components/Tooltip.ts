import config from "../../config";
import Component, { IComponent, IComponentOptions, IComponentSelector } from "../core/Component";


const selectors = {
    element: `.${config.prefix}-tooltip`,
    content: `.${config.prefix}-tooltip-content`,
    wrapper: `.${config.prefix}-tooltip-wrapper`,
    header: `.${config.prefix}-tooltip-header`
}


interface ITooltipSelector extends IComponentSelector {
    content: string
    wrapper: string
    header: string
}


interface ITooltipOptions extends IComponentOptions {

}


interface ITooltip extends IComponent {
    selectors?: ITooltipSelector,
    options?: ITooltipOptions
}


class Tooltip extends Component {
    // options: ITooltipOptions;

    constructor(props: ITooltip = {}) {
        super({
            ...props,
            Component: Tooltip,
            selectors: Object.assign(selectors, props.selectors || {})
        })


        if (this.options && this.options.mount) {
            this.mount()
        }
    }

    mount() {
        if (!this.$element || this._mount || this.$element.hasAttribute('data-mount')) return;
        super.mount()

        this.options = Object.assign({}, this.options)

        this.handlers = {
            mouseOverHandler: this.mouseOverHandler.bind(this),
            mouseOutHandler: this.mouseOutHandler.bind(this),
            clickHandler: this.clickHandler.bind(this),
        }

        this.addEvents()

        this.on.mount(this)
    }

    addEvents() {
        this.$element.addEventListener('mouseover', this.handlers.mouseOverHandler)
        this.$element.addEventListener('mouseout', this.handlers.mouseOutHandler)
        this.$element.addEventListener('click', this.handlers.clickHandler)
    }

    mouseOverHandler() {
        this.$element.toggleAttribute('data-active')
        this.on.render(this)
    }

    mouseOutHandler() {
        this.$element.removeAttribute('data-active')
        this.on.destroy(this)
    }

    clickHandler() {
        this.$element.toggleAttribute('data-active')

        if (this.$element.hasAttribute('data-active')) {
            this.on.render(this)
        } else {
            this.on.destroy(this)
        }
    }

    unmount() {
        super.unmount()

        this.$element.removeEventListener('mouseover', this.handlers.mouseOverHandler)
        this.$element.removeEventListener('mouseout', this.handlers.mouseOutHandler)
        this.$element.removeEventListener('click', this.handlers.clickHandler)

        this.on.unmount(this)
    }
}


export default Tooltip