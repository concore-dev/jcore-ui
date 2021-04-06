import { IObject, TFunction } from "../../interfaces";
import EventEmitter, { TEventEmitter } from "../../utils/EventEmitter";
import Tooltip from "./Tooltip";



export type TComponents = Tooltip;
export type TComponentsClass = typeof Tooltip;

export interface IComponent extends IObject {
    selectors?: IObject,
    $element?: HTMLElement | NodeListOf<HTMLElement> | string
}


export interface IComponentClass extends IComponent {
    Component: TComponentsClass
}


export interface IComponentSelector {
    element?: string
    content?: string
    wrapper?: string
    header?: string
}


class Component {
    $element: HTMLElement;
    emitter: TEventEmitter;
    _components: any[];
    state: IObject;
    selectors: IComponentSelector;
    name: string;

    constructor(props: IComponentClass) {
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

    get components() {
        return this._components;
    }

    getByName(arrayComponents: TComponents[], name: string): any {
        return arrayComponents.filter(component => component.name === name)[0]
    }
}


export default Component