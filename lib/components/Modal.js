import utils from '@utils'

class Modal {
    constructor(props = {}) {
        if (Array.isArray(props.modal) || props.modal instanceof NodeList) {
            let array = Array.from(props.modal);
            let newProps = props;

            if (array.length) {
                array = array.map(el => {
                    newProps.modal = el;
                    return new Modal(newProps);
                });
            }

            return array;
        }

        this.transitionEnd = utils.event.transitionEnd()

        this.state = {
            wrapper: document.querySelector('body'),
            modalClose: false,
            overlay: false,
            children: false,
            modal: false,
            options: {
                adaptive: true,
                mobile: false,
                modalName: '',
                modalTag: {},
                modalCloseTag: {},
                modalContentTag: {}
            },
            build: false,
            render: false,
            onRender: () => {},
            onDestroy: () => {}
        }

        this.state = utils.object.extend(this.state, props)

        if (this.state.modal) {
            this.init()
        } else {
            this.build()
        }
    }

    /**
     * Инициализация Modal
     */
    init() {
        if (this.state.modal && !this.state.modal.hasAttribute('build')) {
            const overlay = this.state.modal.closest('[am-modal-overlay]');
            const modal = this.state.modal;
            const modalClose = this.state.modal.querySelector('[am-modal-close]');

            modal.setAttributes({'build': '', ...this.state.options.modalTag, [this.state.options.mobile ? 'mobile' : '']: '',});
            overlay.setAttributes({[this.state.options.mobile ? 'mobile' : '']: '',});
            modalClose.setAttributes({...this.state.options.modalCloseTag});

            if (this.state.modalClose.length > 0) {
                this.state.modalClose.forEach(item => {
                    modalClose.appendChild(item)
                })
            }

            this.state.modal = modal
            this.state.overlay = overlay
            this.state.modalClose = modalClose
            this.state.build = true
            this.state.options.modalName = modal.getAttribute('am-modal')

            this.state.overlay.addEventListener('click', this.destroy.bind(this))
            this.state.modalClose.addEventListener('click', this.destroy.bind(this))
        }
    }

    /**
     * Создает Modal
     */
    build() {
        const modalClose = utils.element.create('div', {'am-modal-close': '', ...this.state.options.modalCloseTag}, this.state.modalClose.length > 0 ? this.state.modalClose: []);
        const modalContent = utils.element.create('div', {
            'am-modal-content': '', ...this.state.options.modalContentTag}, this.state.children.length > 0 ? this.state.children: []);

        const modal = utils.element.create('div', {
            'am-modal': this.state.options.modalName,
            'build': '',
            [this.state.options.adaptive && !this.state.options.mobile ? 'adaptive' : '']: '',
            [this.state.options.mobile ? 'mobile' : '']: '',
            ...this.state.options.modalTag
        }, [modalClose, modalContent]);

        const overlay = utils.element.create('div', {
            'am-modal-overlay': this.state.options.modalName,
            [this.state.options.mobile ? 'mobile' : '']: '',
        }, []);

        this.state.modal = modal
        this.state.overlay = overlay
        this.state.modalClose = modalClose
        this.state.build = true

        this.state.overlay.addEventListener('click', this.destroy.bind(this))
        this.state.modalClose.addEventListener('click', this.destroy.bind(this))
    }

    /**
     * Открывает Modal
     */
    render() {
        if (this.state.options.mobile) {
            this.hideChildren([...this.state.wrapper.children])
        } else {
            document.querySelector('body').style.setProperty('overflow', 'hidden')
        }

        // this.state.wrapper.insertBefore(this.state.overlay, this.state.wrapper.children[0]);
        this.state.wrapper.appendChild(this.state.overlay)
        this.state.wrapper.appendChild(this.state.modal)

        this.state.onRender()
        this.state.render = true;

        setTimeout(() => {
            this.state.overlay.setAttribute('active', '');
            this.state.modal.setAttribute('active', '');
        }, 10);
    }

    /**
     * Закрывает Modal
     * @param {Event} e window.event
     * @param {Boolean} unMount передать true, если необходимо закрыть модалку
     */
    destroy(e = false, unMount = false) {
        if (!unMount) {
            e.stopPropagation();
        }

        if (!unMount) {
            if (!(e.target.hasAttribute('am-modal-close') || e.target.closest('[am-modal-close]') || e.target.hasAttribute('am-modal-overlay'))) {
                return
            }
        }

        if (!this.state.render) {
            return;
        }

        this.state.overlay.addEventListener(this.transitionEnd, () => {
            this.state.overlay.removeAttribute('closing');
            this.state.modal.removeAttribute('closing');

            this.state.overlay.removeAttribute('active');
            this.state.modal.removeAttribute('active');

            this.state.overlay.remove();
            this.state.modal.remove();
            this.state.onDestroy();
        }, {once: true});

        this.state.overlay.setAttribute('closing', '');
        this.state.modal.setAttribute('closing', '');
        this.state.render = false;
        document.querySelector('body').style.removeProperty('overflow')

        if (this.state.options.mobile) {
            this.showChildren([...this.state.wrapper.children])
        }
    }

    /**
     * Скрывает элементы
     * @param {Array} needToHide массив элементов или коллекция, которые необходимо скрыть
     */
    hideChildren(needToHide) {
        needToHide.forEach((el) => {
            if (el) {
                if (el === this.state.overlay) {
                    return
                }
                if (el.constructor.name === 'HTMLCollection') {
                    el.forEach((item) => {
                        item.style.display = 'none';
                    })
                } else {
                    el.style.display = 'none';
                }
            }
        })
    }

    /**
     * Удаляет style у элементов
     * @param {Array} needToHide массив элементов или коллекция
     */
    showChildren(needToShow) {
        needToShow.forEach((el) => {
            if (el) {
                if (el === this.state.overlay) {
                    return
                }
                if (el.constructor.name === 'HTMLCollection') {
                    el.forEach((item) => {
                        item.removeAttribute('style')
                    })
                } else {
                    el.removeAttribute('style')
                }
            }
        })
    }

    /**
     * Инициализация для шаблонных Modal
     * @param {Object} props
     *
     * @return {Array} modals
     */
    static bubbleInit(props = {}, callback = () => {}) {
        props.modal = document.querySelectorAll('[am-modal][data-bubble]');
        const modals = new Modal(props || {})

        modals.forEach(modal => {
            const target = modal.state.modal.getAttribute('am-modal')
            const buttonTargets = document.querySelectorAll(`[am-modal-target="${target}"]`)

            if (buttonTargets.length) {
                buttonTargets.forEach(buttonTarget => {
                    buttonTarget.addEventListener('click', e => modal.render())
                })
            }

            callback(modal)
        });

        return modals;
    }

    /**
     * фильтрует массив модалок по названию
     * @param {Array} arrayModal
     * @param {String} modalName
     *
     * @return {Modal}
     */
    static getModalByName(arrayModal, modalName) {
        return arrayModal.filter(modal => modal.state.options.modalName === modalName)[0]
    }
}

export default Modal