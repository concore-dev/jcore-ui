import config from "../../configs";
import Component, { IComponent, IComponentSelector } from "../core/Component";


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


interface ITooltip extends IComponent {
    selectors?: ITooltipSelector
}


class Tooltip extends Component {
    constructor(props: ITooltip = {}) {
        super({
            ...props,
            Component: Tooltip,
            selectors: Object.assign(selectors, props.selectors || {})
        })

        this.init()
    }

    init() {
        if (!this.$element || this._init || this.$element.hasAttribute('data-init')) return;

        super.init()

        this.addEvents()
    }

    addEvents() {
        this.$element.addEventListener('mouseover', e => this.mouseOverHandler())
        this.$element.addEventListener('mouseout', e => this.mouseOutHandler())
        this.$element.addEventListener('click', e => this.clickHandler())
    }

    mouseOverHandler() {
        this.$element.toggleAttribute('data-active')
    }

    mouseOutHandler() {
        this.$element.removeAttribute('data-active')
    }

    clickHandler() {
        this.$element.toggleAttribute('data-active')
    }
}


export default Tooltip