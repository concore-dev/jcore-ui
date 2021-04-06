import config from "../../configs";
import Component, { IComponent, IComponentClass, IComponentSelector } from "../core/Component";


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
        super.init()

        this.addEvents()
    }

    addEvents() {
        this.$element.addEventListener('mouseover', this.mouseOver)
        this.$element.addEventListener('mouseout', this.mouseOut)
    }

    mouseOver() {
        this.$element.toggleAttribute('data-active')
    }

    mouseOut() {
        this.$element.toggleAttribute('data-active')
    }
}


export default Tooltip