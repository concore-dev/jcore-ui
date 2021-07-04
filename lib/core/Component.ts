import { IObject } from "../interfaces";
import EventEmitter, { TEventEmitter } from "../utils/EventEmitter";
import { $, JDom } from "./JDom";

export interface IComponentSelector {
    element: string;
}

export interface IComponentOptions {
    mount?: boolean;
    name?: string;
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
    Component: any;
}

interface Component {
    handlers?: IObject;
    $element: JDom;
    emitter: TEventEmitter;
    components: any[];
    selectors: IComponentSelector;
    _mount: boolean;
    options: IComponentOptions;
    on: IComponentOn;
}

class Component {
    constructor(props: IComponentClass) {
        /**
         * Если пришел массив HTMLElement,
         * то для каждого вызываем экземпляр компонента
         * и записываем их в массив components
         */
        if (Array.isArray(props.$element) || props.$element instanceof NodeList) {
            let array = Array.from(props.$element);

            if (array.length) {
                this.components = array.map(el => {
                    if (this._mount || $(el).hasAttr('data-mount')) {
                        return;
                    };

                    return new props.Component(Object.assign(props, {
                        $element: el
                    }));
                }).filter(cpm => cpm);
            }

            return this;
        };

        /**
         * Если не передали HTMLElement,
         * то делаем поиск по селектору элемента и вызываем для него экземпляр компонента
         */
        if (!props.$element) {
            return new props.Component({
                ...props,
                $element: $(props.selectors.element).element
            });
        };

        this.$element = $(props.$element);

        if (!this.$element) {
            // throw Error(`Не найден HTMLElement ${this.constructor.name}`)
            console.log(Error(`Не найден HTMLElement ${this.constructor.name}`));
        };

        this.options = {
            mount: true,
            name: this.$element.dataset.name || props.options && props.options.name || ''
        };

        this.on = {
            mount: () => {},
            render: () => {},
            destroy: () => {},
            unmount: () => {},
        };

        this.selectors = props.selectors;
        this.emitter = props.emitter || new EventEmitter();

        this.options = Object.assign(this.options, props.options || {});
        this.on = Object.assign(this.on, props.on || {});
    }


    mount() {
        this.$element.attr('data-mount', 'true');
        this._mount = true;
    }

    getByName(components: Component[], name: string): Component {
        return components.filter(component => component.options.name === name)[0];
    }

    unmount() {
        this._mount = false;
        this.$element.attr('data-mount', null);
    }
}

export default Component