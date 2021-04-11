import Component, { IComponent, IComponentSelector } from "../core/Component";
interface IDropdownSelector extends IComponentSelector {
    content: string;
    wrapper: string;
    header: string;
}
interface IDropdown extends IComponent {
    selectors?: IDropdownSelector;
}
declare class Dropdown extends Component {
    constructor(props?: IDropdown);
    mount(): void;
    addEvents(): void;
    documentClickHandler(e: Event): void;
    clickHandler(): void;
    unmount(): void;
}
export default Dropdown;
//# sourceMappingURL=Dropdown.d.ts.map