import Component, { IComponent, IComponentOn, IComponentOptions, IComponentSelector } from "../core/Component";
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
declare class Modal extends Component {
    constructor(props?: IModal);
    mount(): void;
    addEvents(): void;
    unmount(): void;
    render(): void;
    destroy(): void;
}
export default Modal;
//# sourceMappingURL=Modal.d.ts.map