import Component, { IComponent, IComponentOn, IComponentOptions, IComponentSelector } from "../core/Component";
import config from '../../config';
import createElement from "../utils/createElement";
import event from "../utils/event";
import { $, JDom } from "../core/JDom";

const selectors = {
    element: `.${config.prefix}-modal`,
    overlay: `.${config.prefix}-modal-overlay`,
    content: `.${config.prefix}-modal-content`,
    close: `.${config.prefix}-modal-close`,
    btnTarget: `data-modal-target`,
}

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
    // change?: (ctx?: Component) => void;
}

interface IModalElements {
    // $close?: HTMLElement
    $btnTarget?: JDom;
    $container?: JDom;
}

interface IModal extends IComponent {
    selectors?: IModalSelector;
    options?: IModalOptions;
    on?: IModalOn;
    elements?: IModalElements;
}

interface Modal {
    selectors: IModalSelector;
    $overlay: JDom;
    $close: JDom;
    $btnTarget: JDom;
    $container?: JDom;
    options: IModalOptions;
    on: IModalOn;
    props: IModal;
    isRender: boolean;
}

class Modal extends Component {
    constructor(props: IModal = {}) {
        super({
            ...props,
            Component: Modal,
            selectors: Object.assign(selectors, props.selectors || {})
        });

        this.props = props;

        if (this.options && this.options.mount) {
            this.mount();
        }
    }
    mount() {
        if (!this.$element || this._mount || this.$element.attr('data-mount')) {
            return;
        }

        super.mount();

        this.options = Object.assign({
            adaptive: this.$element.dataset.adaptive || true,
        }, this.options);

        this.handlers = {
            // change: this.change.bind(this)
        };

        this.isRender = false;

        this.$overlay = $(`<div class="${this.selectors.overlay.replace('.', '')}"></div>`);
        this.$close = this.$element.find(this.selectors.close);
        this.$btnTarget = $(this.props.elements?.$btnTarget || $(`[${this.selectors.btnTarget}="${this.options.name}"]`));
        this.$container = $(this.props.elements?.$container || $(`body`));

        this.addEvents();

        this.on.mount(this);
        this.emitter.emit('mount', this);
    }

    addEvents() {
        if (this.options.adaptive) {
            this.$element.attr('data-adaptive', '');
        }

        if (this.$btnTarget) {
            this.$btnTarget.on('click', e => this.render());
        }

        this.$overlay.on('click', this.destroy.bind(this));
        this.$close.on('click', this.destroy.bind(this));
    }

    unmount() {
        super.unmount();

        this.on.unmount(this);
        this.emitter.emit('unmount', this);
    }


    render() {
        $('body').style.setProperty('overflow', 'hidden');

        this.$container.append(this.$overlay.get());
        this.$container.append(this.$element.get());

        this.isRender = true;

        this.on.render(this);
        this.emitter.emit('render', this);

        setTimeout(() => {
            this.$overlay.attr('data-active', '');
            this.$element.attr('data-active', '');
        }, 10);
    }

    destroy() {
        if (!this.isRender) {
            return;
        }

        this.$overlay.on(event.transitionEnd(), () => {
            this.$overlay.attr('data-closing', null);
            this.$element.attr('data-closing', null);

            this.$overlay.attr('data-active', null);
            this.$element.attr('data-active', null);

            this.$overlay.remove();
            this.$element.remove();
        }, {once: true});

        this.$overlay.attr('data-closing', '');
        this.$element.attr('data-closing', '');
        this.isRender = false;

        this.on.destroy(this);
        this.emitter.emit('destroy', this);

        document.querySelector('body').style.removeProperty('overflow');
    }
}

export default Modal