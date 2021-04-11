import Component, { IComponent, IComponentOn, IComponentOptions, IComponentSelector } from "../core/Component";
interface IProgressSelector extends IComponentSelector {
    percent: string;
    bar: string;
}
interface ICollapseOptions extends IComponentOptions {
    percent?: number;
    type?: string;
}
interface ICollapseOn extends IComponentOn {
    change?: (ctx?: Component) => void;
}
interface ICollapse extends IComponent {
    selectors?: IProgressSelector;
    options?: ICollapseOptions;
    on?: ICollapseOn;
}
interface Progress {
    selectors: IProgressSelector;
    $percent: HTMLElement;
    $bar: HTMLElement;
    options: ICollapseOptions;
    on: ICollapseOn;
}
declare class Progress extends Component {
    constructor(props?: ICollapse);
    mount(): void;
    addEvents(): void;
    change(value: number, lifecycle?: boolean): void;
    getPercent(): number;
}
export default Progress;
//# sourceMappingURL=Progress.d.ts.map