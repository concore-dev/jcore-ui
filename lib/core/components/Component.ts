import { IObject, TFunction } from "../../interfaces";
import EventEmitter, { TEventEmitter } from "../../utils/EventEmitter";


interface IComponent extends IObject {
    Component: any
}


class Component {
    $element: HTMLElement;
    emitter: TEventEmitter;
    _components: any[]

    constructor(props?: IComponent) {
        if (Array.isArray(props.$element) || props.$element instanceof NodeList) {
            let array = Array.from(props.$element);
            let newProps = props;

            if (array.length) {
                this._components = array.map(el => {
                    newProps.modal = el;
                    return new props.Component(newProps);
                });
            }

            return this;
        }

        this.emitter = props.emitter || new EventEmitter();
    }

    get components() {
        return this._components;
    }

    static bubble(cb: TFunction, props?: IObject) {
        cb()
    }

    // static bubbleInit(props = {}, callback = () => {}) {
    //     props.modal = document.querySelectorAll('[am-modal][data-bubble]');
    //     const modals = new Modal(props || {})

    //     modals.forEach(modal => {
    //         const target = modal.state.modal.getAttribute('am-modal')
    //         const buttonTargets = document.querySelectorAll(`[am-modal-target="${target}"]`)

    //         if (buttonTargets.length) {
    //             buttonTargets.forEach(buttonTarget => {
    //                 buttonTarget.addEventListener('click', e => modal.render())
    //             })
    //         }

    //         callback(modal)
    //     });

    //     return modals;
    // }

    // /**
    //  * фильтрует массив модалок по названию
    //  * @param {Array} arrayModal
    //  * @param {String} modalName
    //  *
    //  * @return {Modal}
    //  */
    // static getModalByName(arrayModal, modalName) {
    //     return arrayModal.filter(modal => modal.state.options.modalName === modalName)[0]
    // }
}


export default Component