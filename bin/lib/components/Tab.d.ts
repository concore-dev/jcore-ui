import { IComponent, IComponentOn, IComponentOptions, IComponentSelector } from '../core/Component';
import Component from "../core/Component";
interface ITabSelector extends IComponentSelector {
    list: string;
    tab: string;
    wrapper: string;
    content: string;
}
interface ITabOptions extends IComponentOptions {
    active?: boolean;
}
interface ITabOn extends IComponentOn {
    toggle?: (ctx?: Component) => void;
}
interface ITab extends IComponent {
    selectors?: ITabSelector;
    options?: ITabOptions;
    on?: ITabOn;
}
interface Tab {
    options: ITabOptions;
    $list: HTMLElement;
    $tabs: NodeListOf<HTMLElement> | Array<Element>;
    $contents: NodeListOf<HTMLElement> | Array<Element>;
    selectors: ITabSelector;
    on: ITabOn;
}
declare class Tab extends Component {
    constructor(props?: ITab);
    mount(): void;
    addEvents(): void;
    change(e: Event): void;
    toggle(tab: HTMLElement, content: HTMLElement, lifeCycle?: boolean): void;
    unmount(): void;
}
export default Tab;
//# sourceMappingURL=Tab.d.ts.map