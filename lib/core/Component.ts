import { IObject, TFunction } from "../interfaces";
import EventEmitter, { TEventEmitter } from "../utils/EventEmitter";
import Tooltip from "../components/Tooltip";
import Dropdown from "../components/Dropdown";


export type TComponents = Tooltip | Dropdown;
export type TComponentsClass = typeof Tooltip;


export interface IComponentSelector {
    element: string
}


export interface IComponentOptions {
    mount: boolean
}


export interface IComponentOn {
    mount?: (ctx?: Component) => void;
    render?: (ctx?: Component) => void;
    destroy?: (ctx?: Component) => void;
    unmount?: (ctx?: Component) => void;
}


export interface IComponent extends IObject {
    selectors?: IComponentSelector;
    $element?: HTMLElement | NodeListOf<HTMLElement> | string;
    options?: IComponentOptions;
    on?: IComponentOn;
}


export interface IComponentClass extends IComponent {
    Component: any
}


export interface IComponentState extends IObject {
    name?: string;
}


interface Component {
    handlers?: IObject;
    state: IComponentState
}


class Component {
    $element: HTMLElement;
    emitter: TEventEmitter;
    components: any[];
    selectors: IComponentSelector;
    _mount: boolean = false;
    options: IComponentOptions;
    on: IComponentOn;

    constructor(props: IComponentClass) {
        /**
         * Если пришел массив HTMLElement,
         * то для каждого вызываем экземпляр компонента
         * и записываем их в массив
         */
        if (Array.isArray(props.$element) || props.$element instanceof NodeList) {
            let array = Array.from(props.$element);
            let newProps = props;

            if (array.length) {
                this.components = array.map(el => {
                    if (this._mount || el.hasAttribute('data-mount')) return;

                    newProps.$element = el;
                    return new props.Component(newProps);
                }).filter(cpm => cpm);
            } else {
                throw Error(`Не найден HTMLElement ${this.constructor.name}`)
            }

            return this;
        }

        /**
         * Если не передали свойство HTMLElement,
         * то делаем поиск по селектору элемента и вызываем для него экземпляр компонента
         */
        if (!props.$element) {
            return new props.Component({
                ...props,
                $element: document.querySelectorAll(props.selectors.element)
            });
        }

        this.$element = props.$element instanceof Element ? props.$element : document.querySelector(props.$element);

        if (!this.$element) {
            throw Error(`Не найден HTMLElement ${this.constructor.name}`)
        }

        this.options = {
            mount: true
        }

        const ctx = this;

        this.on = {
            mount: (ctx) => {},
            render: (ctx) => {},
            destroy: (ctx) => {},
            unmount: (ctx) => {},
        }

        this.state = {
            name: this.$element.dataset.name || props.state && props.state.name || null
        }
        this.selectors = props.selectors;
        this.emitter = props.emitter || new EventEmitter();

        this.options = Object.assign(this.options, props.options || {})
        this.on = Object.assign(this.on, props.on || {})
    }


    mount() {
        this.$element.setAttribute('data-mount', 'true')
        this._mount = true;
    }

    getByName(components: TComponents[], name: string): TComponents {
        return components.filter(component => component.state.name === name)[0]
    }

    unmount() {
        this._mount = false;
        this.$element.removeAttribute('data-mount')
    }
}


export default Component