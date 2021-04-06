import { IObject, TFunction } from "../interfaces";
import EventEmitter, { TEventEmitter } from "../utils/EventEmitter";
import Tooltip from "../components/Tooltip";


export type TComponents = Tooltip;
export type TComponentsClass = typeof Tooltip;

export interface IComponentSelector {
    element: string
}

export interface IComponent extends IObject {
    selectors?: IComponentSelector,
    $element?: HTMLElement | NodeListOf<HTMLElement> | string
}

export interface IComponentClass extends IComponent {
    Component: any
}


class Component {
    $element: HTMLElement;
    emitter: TEventEmitter;
    _components: any[];
    selectors: IComponentSelector;
    name: string;
    _init: boolean = false;

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
                this._components = array.map(el => {
                    newProps.$element = el;
                    return new props.Component(newProps);
                });
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

        this.name = this.$element.dataset.name || '';
        this.selectors = props.selectors;
        this.emitter = props.emitter || new EventEmitter();
    }

    init() {
        if (!this.$element || this._init) return;

        this._init = true;
    }

    get components() {
        return this._components;
    }

    getByName(arrayComponents: TComponents[], name: string): any {
        return arrayComponents.filter(component => component.name === name)[0]
    }
}


export default Component