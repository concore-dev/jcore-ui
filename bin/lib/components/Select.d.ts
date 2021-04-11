import Component, { IComponent, IComponentOn, IComponentOptions, IComponentSelector } from '../core/Component';
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
declare class Select extends Component {
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
//# sourceMappingURL=Select.d.ts.map