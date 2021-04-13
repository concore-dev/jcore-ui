import Component, { IComponent, IComponentOn, IComponentOptions, IComponentSelector } from '../core/Component';
import config from '../../config';


const selectors = {
    element: `.${config.prefix}-select`,
    wrapper: `.${config.prefix}-select-wrapper`,
    value: `.${config.prefix}-select-value`,
    items: `.${config.prefix}-select-items`,
    item: `.${config.prefix}-select-item`,
    input: `.${config.prefix}-select-input`,
    current: `.${config.prefix}-select-current`,
}


interface ISelectSelector extends IComponentSelector {
    wrapper: string;
    value: string;
    items: string;
    item: string;
    input: string;
    current: string;
}


interface ISelectValue {
    value: string| number;
    label: string| number;
}


interface ISelectOptions extends IComponentOptions {
    value?: ISelectValue
    items?: ISelectValue[]
}


interface ISelectOn extends IComponentOn {
    toggle?: (ctx?: Component) => void;
    change?: (ctx?: Component) => void;
}


interface ISelect extends IComponent {
    selectors?: ISelectSelector
    options?: ISelectOptions
    on?: ISelectOn
}


interface Select {
    selectors: ISelectSelector
    options: ISelectOptions
    value: ISelectValue
    items: ISelectValue[]
    $input: HTMLInputElement
    $value: HTMLElement
    $items: HTMLElement
    $itemList: NodeListOf<HTMLElement>
    on: ISelectOn
}


class Select extends Component {
    constructor(props: ISelect = {}) {
        super({
            ...props,
            Component: Select,
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
            // active: this.$element.dataset.active || false
        }, this.options)

        this.on = Object.assign({
            toggle: () => { },
            change: () => { }
        }, this.on)

        this.handlers = {
            toggle: this.toggle.bind(this),
            documentClickHandler: this.documentClickHandler.bind(this),
            change: this.change.bind(this)
        }

        this.value = this.options && this.options.value || null;
        this.items = this.options && this.options.items || null;

        this.$input = this.$element.querySelector(this.selectors.input);
        this.$value = this.$element.querySelector(this.selectors.value);
        this.$items = this.$element.querySelector(this.selectors.items);
        this.$itemList = this.$items.querySelectorAll(this.selectors.item);

        this.addEvents()

        this.on.mount(this)
        this.emitter.emit('mount', this)
    }

    addEvents() {
        this.$value.addEventListener('click', this.handlers.toggle)
        document.addEventListener('click', this.handlers.documentClickHandler)
        this.$itemList.forEach($item => $item.addEventListener('click', this.handlers.change))
    }

    documentClickHandler(e: Event) {
        if (!e.target.closest(this.selectors.element) && this.$element.hasAttribute('data-active')) {
            this.$element.toggleAttribute('data-active')

            this.on.toggle(this)
            this.emitter.emit('toggle', this)
        }
    }

    toggle() {
        this.$element.toggleAttribute('data-active')

        this.on.toggle(this)
        this.emitter.emit('toggle', this)
    }

    close() {
        this.$element.removeAttribute('data-active')
    }

    change(e: Event) {
        const $current = this.$items.querySelector('[data-selected]');
        const $item = e.target.closest(this.selectors.item)
        const value = $item.dataset.value.trim();
        const label = $item.innerHTML.toString().trim();

        if ($item.hasAttribute('data-selected')) {
            return;
        }

        if ($current) {
            $current.removeAttribute('data-selected');
        }

        $item.setAttribute('data-selected', '');

        this.value = {
            value,
            label
        }

        this.$input.value = value;
        this.$value.setAttribute('data-value', value)
        this.$value.innerHTML = label;

        this.close()

        this.on.change(this)
        this.emitter.emit('change', this)
    }

    unmount() {
        super.unmount()

        this.on.unmount(this)
        this.emitter.emit('unmount', this)
    }
}


export default Select