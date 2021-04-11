declare module "config/index" {
    const config: any;
    export default config;
}
declare module "lib/interfaces/index" {
    export interface IObject {
        [property: string]: any;
    }
    export type TFunction = (...args: any) => any;
}
declare module "lib/utils/EventEmitter" {
    import { IObject } from "lib/interfaces/index";
    import { TFunction } from "lib/interfaces/index";
    export type TEventEmitter = EventEmitter;
    class EventEmitter {
        events: IObject;
        constructor();
        on(event: string, listener: TFunction): () => void;
        removeListener(event: string, listener: TFunction): void;
        emit(event: string, ...args: any): void;
        once(event: string, listener: TFunction): void;
    }
    export default EventEmitter;
}
declare module "lib/components/Dropdown" {
    import Component, { IComponent, IComponentSelector } from "lib/core/Component";
    interface IDropdownSelector extends IComponentSelector {
        content: string;
        wrapper: string;
        header: string;
    }
    interface IDropdown extends IComponent {
        selectors?: IDropdownSelector;
    }
    class Dropdown extends Component {
        constructor(props?: IDropdown);
        mount(): void;
        addEvents(): void;
        documentClickHandler(e: Event): void;
        clickHandler(): void;
        unmount(): void;
    }
    export default Dropdown;
}
declare module "lib/components/Accordion" {
    import Component, { IComponent, IComponentOn, IComponentOptions, IComponentSelector } from "lib/core/Component";
    import { IObject } from "lib/interfaces/index";
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
    class Accordion extends Component {
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
}
declare module "lib/components/Collapse" {
    import Component, { IComponent, IComponentOn, IComponentOptions, IComponentSelector } from "lib/core/Component";
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
    class Collapse extends Component {
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
}
declare module "lib/core/Component" {
    import { IObject } from "lib/interfaces/index";
    import { TEventEmitter } from "lib/utils/EventEmitter";
    import Tooltip from "lib/components/Tooltip";
    export type TComponentsClass = typeof Tooltip;
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
    class Component {
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
}
declare module "lib/components/Tooltip" {
    import Component, { IComponent, IComponentOptions, IComponentSelector } from "lib/core/Component";
    interface ITooltipSelector extends IComponentSelector {
        content: string;
        wrapper: string;
        header: string;
    }
    interface ITooltipOptions extends IComponentOptions {
    }
    interface ITooltip extends IComponent {
        selectors?: ITooltipSelector;
        options?: ITooltipOptions;
    }
    class Tooltip extends Component {
        constructor(props?: ITooltip);
        mount(): void;
        addEvents(): void;
        mouseOverHandler(): void;
        mouseOutHandler(): void;
        clickHandler(): void;
        unmount(): void;
    }
    export default Tooltip;
}
declare module "lib/components/Tab" {
    import { IComponent, IComponentOn, IComponentOptions, IComponentSelector } from "lib/core/Component";
    import Component from "lib/core/Component";
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
        $tabs: NodeListOf<HTMLElement>;
        $contents: NodeListOf<HTMLElement>;
        selectors: ITabSelector;
        on: ITabOn;
    }
    class Tab extends Component {
        constructor(props?: ITab);
        mount(): void;
        addEvents(): void;
        change(e: Event): void;
        toggle(tab: HTMLElement, content: HTMLElement, lifeCycle?: boolean): void;
        unmount(): void;
    }
    export default Tab;
}
declare module "lib/utils/createTemplate" {
    const createTemplate: (content: string) => HTMLElement;
    export default createTemplate;
}
declare module "lib/utils/event" {
    const event: {
        transitionEnd(): any;
        animationEnd(): any;
    };
    export default event;
}
declare module "lib/components/Modal" {
    import Component, { IComponent, IComponentOn, IComponentOptions, IComponentSelector } from "lib/core/Component";
    interface IModalSelector extends IComponentSelector {
        overlay: string;
        content: string;
        close: string;
        btnTarget: string;
    }
    interface IModalOptions extends IComponentOptions {
        adaptive?: boolean;
        children?: HTMLElement[];
    }
    interface IModalOn extends IComponentOn {
    }
    interface IModalElements {
        $btnTarget?: HTMLElement;
        $container?: HTMLElement;
    }
    interface IModal extends IComponent {
        selectors?: IModalSelector;
        options?: IModalOptions;
        on?: IModalOn;
        elements?: IModalElements;
    }
    interface Modal {
        selectors: IModalSelector;
        $overlay: HTMLElement;
        $close: HTMLElement;
        $btnTarget: HTMLElement;
        $container?: HTMLElement;
        options: IModalOptions;
        on: IModalOn;
        props: IModal;
        isRender: boolean;
    }
    class Modal extends Component {
        constructor(props?: IModal);
        mount(): void;
        addEvents(): void;
        unmount(): void;
        render(): void;
        destroy(): void;
    }
    export default Modal;
}
declare module "lib/components/Progress" {
    import Component, { IComponent, IComponentOn, IComponentOptions, IComponentSelector } from "lib/core/Component";
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
    class Progress extends Component {
        constructor(props?: ICollapse);
        mount(): void;
        addEvents(): void;
        change(value: number, lifecycle?: boolean): void;
        getPercent(): number;
    }
    export default Progress;
}
declare module "lib/components/Select" {
    import Component, { IComponent, IComponentOn, IComponentOptions, IComponentSelector } from "lib/core/Component";
    interface ISelectSelector extends IComponentSelector {
        wrapper: string;
        value: string;
        items: string;
        item: string;
        input: string;
        current: string;
    }
    interface ISelectValue {
        value: string | number;
        label: string | number;
    }
    interface ISelectOptions extends IComponentOptions {
        value?: ISelectValue;
        items?: ISelectValue[];
    }
    interface ISelectOn extends IComponentOn {
        toggle?: (ctx?: Component) => void;
        change?: (ctx?: Component) => void;
    }
    interface ISelect extends IComponent {
        selectors?: ISelectSelector;
        options?: ISelectOptions;
        on?: ISelectOn;
    }
    interface Select {
        selectors: ISelectSelector;
        options: ISelectOptions;
        value: ISelectValue;
        items: ISelectValue[];
        $input: HTMLInputElement;
        $value: HTMLElement;
        $items: HTMLElement;
        $itemList: NodeListOf<HTMLElement>;
        on: ISelectOn;
    }
    class Select extends Component {
        constructor(props?: ISelect);
        mount(): void;
        addEvents(): void;
        documentClickHandler(e: Event): void;
        toggle(): void;
        close(): void;
        change(e: Event): void;
        unmount(): void;
    }
    export default Select;
}
declare module "jcore-ui" {
    import Accordion from "lib/components/Accordion";
    import Collapse from "lib/components/Collapse";
    import Dropdown from "lib/components/Dropdown";
    import Modal from "lib/components/Modal";
    import Progress from "lib/components/Progress";
    import Select from "lib/components/Select";
    import Tab from "lib/components/Tab";
    import Tooltip from "lib/components/Tooltip";
    import Component from "lib/core/Component";
    import createTemplate from "lib/utils/createTemplate";
    import event from "lib/utils/event";
    import EventEmitter from "lib/utils/EventEmitter";
    export { Accordion, Collapse, Dropdown, Modal, Progress, Select, Tab, Tooltip, Component, };
    export { createTemplate, event, EventEmitter };
}
//# sourceMappingURL=index.d.ts.map