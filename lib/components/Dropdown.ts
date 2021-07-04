import config from "../../config";
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
        });

        if (this.options && this.options.mount) {
            this.mount()
        }
    }

    mount() {
        if (!this.$element || this._mount || this.$element.attr('data-mount')) {
            return;
        };

        super.mount();

        this.options = Object.assign({}, this.options);

        this.handlers = {
            documentClickHandler: this.documentClickHandler.bind(this),
            clickHandler: this.clickHandler.bind(this)
        };

        this.addEvents();

        this.on.mount(this);
        this.emitter.emit('mount', this);
    }

    addEvents() {
        this.$element.on('click', this.handlers.clickHandler);
        document.addEventListener('click', this.handlers.documentClickHandler);
    }

    documentClickHandler(e: Event) {
        if (!e.target.closest(this.selectors.element) && this.$element.attr('data-active')) {
            this.$element.toggleAttribute('data-active');
            this.on.destroy(this);
            this.emitter.emit('destroy', this);
        }
    }

    clickHandler() {
        this.$element.toggleAttribute('data-active');

        if (this.$element.attr('data-active')) {
            this.on.render(this);
            this.emitter.emit('render', this);
        } else {
            this.on.destroy(this);
            this.emitter.emit('destroy', this);
        }
    }

    unmount() {
        super.unmount();

        document.removeEventListener('click', this.handlers.documentClickHandler);
        this.$element.off('click', this.handlers.clickHandler, null);

        this.on.unmount(this);
        this.emitter.emit('unmount', this);
    }
}

export default Dropdown