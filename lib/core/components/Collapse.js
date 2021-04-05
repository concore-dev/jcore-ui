import utils from '@utils';
import EventEmitter from '@utils/EventEmitter';

class Collapse extends EventEmitter {
    constructor(selector, props = {}) {
        super()

        if (Array.isArray(selector) || selector instanceof NodeList) {
            let array = Array.from(selector);

            if (array.length) {
                array = array.map(el => new Collapse(el, props));
            }

            return array;
        }

        this.selectors = {
            collapse: '[am-collapse]',
            wrapper: '[am-collapse-wrapper]',
            button: '[am-collapse-button]'
        };

        this.$element = selector instanceof HTMLElement ? selector : document.querySelector(selector);
        this.$wrapper = this.$element.querySelector(this.selectors.wrapper);
        this.$button = this.$element.querySelector(this.selectors.button);

        this.state = {
            height: Number(this.$wrapper.getAttribute('data-height')) || 0,
            duration: Number(this.$wrapper.getAttribute('data-duration')) || 300,
            init: true
        }

        this.isActive = false;
        this.state = utils.object.extend(this.state, props);
        this.scrollHeight = this.$wrapper.scrollHeight;

        this.initialized = false;

        if (this.state.init) {
            this.init();
        }
    }

    init() {
        if (this.initialized || this.$element.hasAttribute('init')) return;

        this.$wrapper.style.setProperty('max-height', `${this.state.height}px`)
        this.$wrapper.style.setProperty('transition', `all ease-in-out ${this.state.duration}ms`)

        this.$button.addEventListener('click', e => this.toggle())
        window.addEventListener('resize', e => this.resize())

        this.initialized = true;
        this.$element.setAttribute('init', '')

        this.initButtonByHeight()

        this.emit('init', {
            element: this.$element,
            wrapper: this.$wrapper,
            button: this.$button
        })
    }

    toggle() {
        if (this.isActive) {
            this.close()
        } else {
            this.open()
        }

        this.emit('toggle', {
            element: this.$element,
            wrapper: this.$wrapper,
            button: this.$button
        })
    }

    open() {
        this.$button.setAttribute('active', '')
        this.$element.setAttribute('active', '')
        this.$wrapper.setAttribute('active', '')
        this.$wrapper.style.setProperty('max-height', `${this.scrollHeight}px`)

        this.isActive = true;
    }

    close() {
        this.$button.removeAttribute('active')
        this.$element.removeAttribute('active')
        this.$wrapper.removeAttribute('active')
        this.$wrapper.style.setProperty('max-height', `${this.state.height}px`)

        this.isActive = false;
    }

    resize() {
        this.scrollHeight = this.$wrapper.scrollHeight;

        if (this.isActive) {
            this.$wrapper.style.setProperty('max-height', `${this.scrollHeight}px`)
        } else {
            this.$wrapper.style.setProperty('max-height', `${this.state.height}px`)
        }

        this.initButtonByHeight()
    }

    initButtonByHeight() {
        if (this.scrollHeight < this.state.height) {
            this.$button.removeAttribute('init')
        } else {
            this.$button.setAttribute('init', '')
        }
    }

    static bubbleInit(props = {}) {
        const collapses = new Collapse(document.querySelectorAll('[am-collapse][data-bubble]'), props)

        return collapses;
    }
}

export default Collapse;