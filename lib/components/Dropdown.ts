import config from "../../configs";
import Component, { IComponent, IComponentSelector } from "../core/Component";


const selectors = {
    element: `.${config.prefix}-dropdown`,
    content: `.${config.prefix}-dropdown-content`,
    wrapper: `.${config.prefix}-dropdown-wrapper`,
    header: `.${config.prefix}-dropdown-header`
}


interface IDropdownSelector extends IComponentSelector {
    content: string
    wrapper: string
    header: string
}


interface IDropdown extends IComponent {
    selectors?: IDropdownSelector
}


class Dropdown extends Component {
    constructor(props: IDropdown = {}) {
        super({
            ...props,
            Component: Dropdown,
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
        this.$element.addEventListener('click', e => this.clickHandler())
        document.addEventListener('click', (e) => this.documentClickHandler(e))
    }

    documentClickHandler(e: Event) {
        if (!e.target.closest(this.selectors.element) && this.$element.hasAttribute('data-active')) {
            this.$element.toggleAttribute('data-active')
        }
    }

    clickHandler() {
        this.$element.toggleAttribute('data-active')
    }
}


export default Dropdown