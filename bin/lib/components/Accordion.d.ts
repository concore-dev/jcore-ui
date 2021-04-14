/*!
 * Jcore-ui v1.0.1 - Accordion
 * https://github.com/concore-dev/jcore-ui
 *
 * Copyright 2021 Eryomin Nickolay
 * Published under MIT License
 *
 */
import Component, { IComponent, IComponentOn, IComponentOptions, IComponentSelector } from "../core/Component";
import { IObject } from "../interfaces";
interface IAccordionSelector extends IComponentSelector {
    panel: string;
    tab: string;
    content: string;
}
interface IAccordionOptions extends IComponentOptions {
    active?: boolean;
    multiple?: boolean;
    duration?: number;
}
interface IAccordionOn extends IComponentOn {
    toggle?: (ctx?: Component) => void;
}
interface IAccordion extends IComponent {
    selectors?: IAccordionSelector;
    options?: IAccordionOptions;
    on?: IAccordionOn;
}
interface Accordion {
    options: IAccordionOptions;
    $tabs: NodeListOf<HTMLElement>;
    selectors: IAccordionSelector;
    on: IAccordionOn;
    id: number;
    isShow: boolean;
    isShowTabs: IObject[];
    tab: HTMLElement;
}
declare class Accordion extends Component {
    constructor(props?: IAccordion);
    mount(): void;
    addEvents(): void;
    unmount(): void;
    toggle(e: Event | HTMLElement, cont?: HTMLElement): void;
    setId(tab: HTMLElement): number;
    show(tab: HTMLElement, content: HTMLElement): void;
    showEnd(tab: HTMLElement, content: HTMLElement): void;
    hide(tab: HTMLElement, content: HTMLElement): void;
    hideEnd(tab: HTMLElement, content: HTMLElement): void;
    hideAll(currentTab: HTMLElement): void;
    setHeight(height: string | number | HTMLElement, content: HTMLElement): void;
    setShowTab(tab: HTMLElement, state: boolean): void;
    resize(): void;
}
export default Accordion;
//# sourceMappingURL=Accordion.d.ts.map