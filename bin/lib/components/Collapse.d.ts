import Component, { IComponent, IComponentOn, IComponentOptions, IComponentSelector } from "../core/Component";
interface ICollapseSelector extends IComponentSelector {
    wrapper: string;
    button: string;
}
interface ICollapseOptions extends IComponentOptions {
    height?: number;
    duration?: number;
}
interface ICollapseOn extends IComponentOn {
    toggle?: (ctx?: Component) => void;
}
interface ICollapse extends IComponent {
    selectors?: ICollapseSelector;
    options?: ICollapseOptions;
    on?: ICollapseOn;
}
interface Collapse {
    selectors: ICollapseSelector;
    $wrapper: HTMLElement;
    $button: HTMLElement;
    options: ICollapseOptions;
    isActive: boolean;
    scrollHeight: number;
    on: ICollapseOn;
}
declare class Collapse extends Component {
    constructor(props?: ICollapse);
    mount(): void;
    addEvents(): void;
    unmount(): void;
    toggle(): void;
    open(): void;
    close(): void;
    resize(): void;
    initButtonByHeight(): void;
}
export default Collapse;
//# sourceMappingURL=Collapse.d.ts.map