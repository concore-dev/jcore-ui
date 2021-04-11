import Component, { IComponent, IComponentOptions, IComponentSelector } from "../core/Component";
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
declare class Tooltip extends Component {
    constructor(props?: ITooltip);
    mount(): void;
    addEvents(): void;
    mouseOverHandler(): void;
    mouseOutHandler(): void;
    clickHandler(): void;
    unmount(): void;
}
export default Tooltip;
//# sourceMappingURL=Tooltip.d.ts.map