import config from "../../../configs";
import { IObject } from "../../interfaces";
import Component, { IComponent, IComponentSelector } from "./Component";




const selectors = {
    element: `.${config.prefix}-tooltip`,
    content: `.${config.prefix}-tooltip-content`,
    wrapper: `.${config.prefix}-tooltip-wrapper`,
    header: `.${config.prefix}-tooltip-header`
}


class Tooltip extends Component {

    constructor(props: IComponent = {}) {
        super({
            ...props,
            Component: Tooltip,
            selectors: Object.assign(selectors, props.selectors || {})
        })

        if (!this.$element) return;

        this.init()
    }

    init() {
    }
}


export default Tooltip