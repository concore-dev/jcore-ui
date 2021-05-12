import { IObject } from "../interfaces";
import { TEventEmitter } from "../utils/EventEmitter";
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
}
declare class Component {
    $element: HTMLElement;
    emitter: TEventEmitter;
    components: any[];
    selectors: IComponentSelector;
    _mount: boolean;
    options: IComponentOptions;
    on: IComponentOn;
    constructor(props: IComponentClass);
    mount(): void;
    getByName(components: Component[], name: string): Component;
    unmount(): void;
}
export default Component;
//# sourceMappingURL=Component.d.ts.map