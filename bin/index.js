var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("config/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const config = {
        prefix: 'j'
    };
    exports.default = config;
});
define("lib/interfaces/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("lib/utils/EventEmitter", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EventEmitter {
        constructor() {
            this.events = {};
        }
        on(event, listener) {
            if (typeof this.events[event] !== 'object') {
                this.events[event] = [];
            }
            this.events[event].push(listener);
            return () => this.removeListener(event, listener);
        }
        removeListener(event, listener) {
            if (typeof this.events[event] === 'object') {
                const idx = this.events[event].indexOf(listener);
                if (idx > -1) {
                    this.events[event].splice(idx, 1);
                }
            }
        }
        emit(event, ...args) {
            if (typeof this.events[event] === 'object') {
                this.events[event].forEach((listener) => listener.apply(this, args));
            }
        }
        once(event, listener) {
            const remove = this.on(event, (...args) => {
                remove();
                listener.apply(this, args);
            });
        }
    }
    ;
    exports.default = EventEmitter;
});
define("lib/components/Dropdown", ["require", "exports", "config/index", "lib/core/Component"], function (require, exports, config_1, Component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    config_1 = __importDefault(config_1);
    Component_1 = __importDefault(Component_1);
    const selectors = {
        element: `.${config_1.default.prefix}-dropdown`,
        content: `.${config_1.default.prefix}-dropdown-content`,
        wrapper: `.${config_1.default.prefix}-dropdown-wrapper`,
        header: `.${config_1.default.prefix}-dropdown-header`
    };
    class Dropdown extends Component_1.default {
        constructor(props = {}) {
            super({
                ...props,
                Component: Dropdown,
                selectors: Object.assign(selectors, props.selectors || {})
            });
            if (this.options && this.options.mount) {
                this.mount();
            }
        }
        mount() {
            if (!this.$element || this._mount || this.$element.hasAttribute('data-mount'))
                return;
            super.mount();
            this.options = Object.assign({}, this.options);
            this.handlers = {
                documentClickHandler: this.documentClickHandler.bind(this),
                clickHandler: this.clickHandler.bind(this)
            };
            this.addEvents();
            this.on.mount(this);
            this.emitter.emit('mount', this);
        }
        addEvents() {
            this.$element.addEventListener('click', this.handlers.clickHandler);
            document.addEventListener('click', this.handlers.documentClickHandler);
        }
        documentClickHandler(e) {
            if (!e.target.closest(this.selectors.element) && this.$element.hasAttribute('data-active')) {
                this.$element.toggleAttribute('data-active');
                this.on.destroy(this);
                this.emitter.emit('destroy', this);
            }
        }
        clickHandler() {
            this.$element.toggleAttribute('data-active');
            if (this.$element.hasAttribute('data-active')) {
                this.on.render(this);
                this.emitter.emit('render', this);
            }
            else {
                this.on.destroy(this);
                this.emitter.emit('destroy', this);
            }
        }
        unmount() {
            super.unmount();
            document.removeEventListener('click', this.handlers.documentClickHandler);
            this.$element.removeEventListener('click', this.handlers.clickHandler);
            this.on.unmount(this);
            this.emitter.emit('unmount', this);
        }
    }
    exports.default = Dropdown;
});
define("lib/components/Accordion", ["require", "exports", "lib/core/Component", "config/index"], function (require, exports, Component_2, config_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Component_2 = __importDefault(Component_2);
    config_2 = __importDefault(config_2);
    const selectors = {
        element: `.${config_2.default.prefix}-accordion`,
        panel: `.${config_2.default.prefix}-accordion-panel`,
        tab: `.${config_2.default.prefix}-accordion-tab`,
        content: `.${config_2.default.prefix}-accordion-content`
    };
    class Accordion extends Component_2.default {
        constructor(props = {}) {
            super({
                ...props,
                Component: Accordion,
                selectors: Object.assign(selectors, props.selectors || {})
            });
            if (this.options && this.options.mount) {
                this.mount();
            }
        }
        mount() {
            if (!this.$element || this._mount || this.$element.hasAttribute('data-mount'))
                return;
            super.mount();
            this.options = Object.assign({
                active: this.$element.dataset.active || false,
                multiple: this.$element.dataset.multiple || false,
                duration: this.$element.dataset.duration || 300
            }, this.options);
            this.on = Object.assign({
                toggle: () => { }
            }, this.on);
            this.handlers = {
                // change: this.change.bind(this),
                resize: this.resize.bind(this),
                toggle: this.toggle.bind(this)
            };
            this.id = 0;
            this.tab = null;
            this.isShow = false;
            this.isShowTabs = [];
            this.$tabs = this.$element.querySelectorAll(this.selectors.tab);
            this.addEvents();
            this.on.mount(this);
            this.emitter.emit('mount', this);
        }
        addEvents() {
            this.$tabs.forEach((tab, i) => {
                const panel = tab.closest(this.selectors.panel);
                const content = panel.querySelector(this.selectors.content);
                const id = this.setId(tab);
                content.style.setProperty('transition', `height ease-in-out ${this.options.duration}ms`);
                this.isShowTabs.push({ tab, id, isShow: false });
                if (this.options.active && i === 0) {
                    this.toggle(tab, content);
                }
                tab.addEventListener('click', this.handlers.toggle);
            });
            window.addEventListener('resize', this.handlers.resize);
        }
        unmount() {
            super.unmount();
            this.$tabs.forEach(tab => tab.removeEventListener('click', this.handlers.toggle));
            window.removeEventListener('resize', this.handlers.resize);
            this.on.unmount(this);
            this.emitter.emit('unmount', this);
        }
        toggle(e, cont) {
            const tab = e instanceof HTMLElement ? e : e.target;
            const panel = tab.closest(this.selectors.panel);
            const content = cont || panel.querySelector(this.selectors.content);
            // Если последний активный таб не равен текущему, сбрасываем состояние
            if (this.tab !== tab && !this.options.multiple && this.$tabs.length > 1) {
                this.isShow = false;
                // если в аккордеоне много панелей, скрываем все, кроме текущей
                this.hideAll(tab);
            }
            // Если multiple не вклчюен, то у всех общее состояние
            if (!this.options.multiple) {
                if (this.isShow) {
                    this.hide(tab, content);
                }
                else {
                    this.show(tab, content);
                }
                this.isShow = !this.isShow;
            }
            else {
                const tabParam = this.isShowTabs.filter(param => param.tab === tab)[0];
                if (tabParam.isShow) {
                    this.setShowTab(tab, false);
                    this.hide(tab, content);
                }
                else {
                    this.setShowTab(tab, true);
                    this.show(tab, content);
                }
                this.isShow = !this.isShow;
            }
            this.on.toggle(this);
            this.emitter.emit('toggle', this);
        }
        setId(tab) {
            tab.setAttribute('data-id', `${this.id++}`);
            return this.id;
        }
        show(tab, content) {
            const height = content.scrollHeight;
            tab.setAttribute('data-active', '');
            // this.$panels.setAttribute('active', '')
            content.setAttribute('showing', '');
            this.setHeight(`${height}px`, content);
            setTimeout(() => {
                this.showEnd(tab, content);
            }, this.options.duration);
        }
        showEnd(tab, content) {
            content.removeAttribute('showing');
            content.setAttribute('show', '');
            this.emitter.emit('show', this);
            // content.style.setProperty('height', `auto`)
        }
        hide(tab, content) {
            content.setAttribute('hiding', '');
            tab.removeAttribute('data-active');
            this.setHeight(0, content);
            setTimeout(() => {
                this.hideEnd(tab, content);
            }, this.options.duration);
        }
        hideEnd(tab, content) {
            content.removeAttribute('show');
            content.removeAttribute('hiding');
            // this.$panels.removeAttribute('active')
            this.emitter.emit('hide', tab, content);
        }
        hideAll(currentTab) {
            if (currentTab) {
                const needTabsHidden = Array.prototype.filter.call(this.$tabs, tab => tab !== currentTab);
                needTabsHidden.forEach(tab => {
                    const panel = tab.closest(this.selectors.panel);
                    const content = panel.querySelector(this.selectors.content);
                    content.removeAttribute('showing');
                    content.removeAttribute('show', '');
                    content.removeAttribute('hiding');
                    tab.removeAttribute('active');
                    this.setHeight(0, content);
                });
                this.tab = currentTab;
            }
            else {
                this.$tabs.forEach(tab => {
                    const panel = tab.closest(this.selectors.panel);
                    const content = panel.querySelector(this.selectors.content);
                    content.removeAttribute('showing');
                    content.removeAttribute('show');
                    content.removeAttribute('hiding');
                    tab.removeAttribute('active');
                    this.setHeight(0, content);
                });
                this.tab = null;
            }
        }
        setHeight(height, content) {
            content.style.setProperty('height', `${content.scrollHeight}px`);
            window.requestAnimationFrame(() => {
                content.style.setProperty('height', `${height}`);
            });
        }
        setShowTab(tab, state) {
            const needTab = this.isShowTabs.filter(param => param.tab === tab)[0];
            this.isShowTabs = this.isShowTabs.map(param => {
                if (param.tab === needTab.tab) {
                    param.isShow = state;
                }
                return param;
            });
        }
        resize() {
            this.$tabs.forEach((tab, i) => {
                if (!tab.hasAttribute('active'))
                    return;
                const panel = tab.closest(this.selectors.panel);
                const content = panel.querySelector(this.selectors.content);
                content.style.setProperty('height', `auto`);
                this.setHeight(tab, content);
            });
        }
    }
    exports.default = Accordion;
});
define("lib/components/Collapse", ["require", "exports", "lib/core/Component", "config/index"], function (require, exports, Component_3, config_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Component_3 = __importDefault(Component_3);
    config_3 = __importDefault(config_3);
    const selectors = {
        element: `.${config_3.default.prefix}-collapse`,
        wrapper: `.${config_3.default.prefix}-collapse-wrapper`,
        button: `.${config_3.default.prefix}-collapse-button`
    };
    class Collapse extends Component_3.default {
        constructor(props = {}) {
            super({
                ...props,
                Component: Collapse,
                selectors: Object.assign(selectors, props.selectors || {})
            });
            if (this.options && this.options.mount) {
                this.mount();
            }
        }
        mount() {
            if (!this.$element || this._mount || this.$element.hasAttribute('data-mount'))
                return;
            super.mount();
            this.options = Object.assign({
                height: this.$element.dataset.height || 0,
                duration: this.$element.dataset.duration || 300,
            }, this.options);
            this.handlers = {
                toggle: this.toggle.bind(this),
                resize: this.resize.bind(this)
            };
            this.on = Object.assign({
                toggle: () => { }
            }, this.on);
            this.$wrapper = this.$element.querySelector(this.selectors.wrapper);
            this.$button = this.$element.querySelector(this.selectors.button);
            this.isActive = false;
            this.scrollHeight = this.$wrapper.scrollHeight;
            this.addEvents();
            this.on.mount(this);
            this.emitter.emit('mount', this);
        }
        addEvents() {
            this.$wrapper.style.setProperty('max-height', `${this.options.height}px`);
            this.$wrapper.style.setProperty('transition', `all ease-in-out ${this.options.duration}ms`);
            this.$button.addEventListener('click', this.handlers.toggle);
            window.addEventListener('resize', this.handlers.resize);
            this.initButtonByHeight();
        }
        unmount() {
            super.unmount();
            this.$button.removeEventListener('click', this.handlers.toggle);
            window.removeEventListener('resize', this.handlers.resize);
            this.$button.removeAttribute('data-mount');
            this.on.unmount(this);
            this.emitter.emit('unmount', this);
        }
        toggle() {
            if (this.isActive) {
                this.close();
            }
            else {
                this.open();
            }
            this.emitter.emit('toggle', this);
            this.on.toggle(this);
        }
        open() {
            this.$button.setAttribute('active', '');
            this.$element.setAttribute('active', '');
            this.$wrapper.setAttribute('active', '');
            this.$wrapper.style.setProperty('max-height', `${this.scrollHeight}px`);
            this.isActive = true;
        }
        close() {
            this.$button.removeAttribute('active');
            this.$element.removeAttribute('active');
            this.$wrapper.removeAttribute('active');
            this.$wrapper.style.setProperty('max-height', `${this.options.height}px`);
            this.isActive = false;
        }
        resize() {
            this.scrollHeight = this.$wrapper.scrollHeight;
            if (this.isActive) {
                this.$wrapper.style.setProperty('max-height', `${this.scrollHeight}px`);
            }
            else {
                this.$wrapper.style.setProperty('max-height', `${this.options.height}px`);
            }
            this.initButtonByHeight();
        }
        initButtonByHeight() {
            if (this.scrollHeight < this.options.height) {
                this.$button.removeAttribute('data-mount');
            }
            else {
                this.$button.setAttribute('data-mount', '');
            }
        }
    }
    exports.default = Collapse;
});
define("lib/core/Component", ["require", "exports", "lib/utils/EventEmitter"], function (require, exports, EventEmitter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    EventEmitter_1 = __importDefault(EventEmitter_1);
    class Component {
        constructor(props) {
            this._mount = false;
            /**
             * Если пришел массив HTMLElement,
             * то для каждого вызываем экземпляр компонента
             * и записываем их в массив
             */
            if (Array.isArray(props.$element) || props.$element instanceof NodeList) {
                let array = Array.from(props.$element);
                let newProps = props;
                if (array.length) {
                    this.components = array.map(el => {
                        if (this._mount || el.hasAttribute('data-mount'))
                            return;
                        newProps.$element = el;
                        return new props.Component(newProps);
                    }).filter(cpm => cpm);
                }
                else {
                    throw Error(`Не найден HTMLElement ${this.constructor.name}`);
                }
                return this;
            }
            /**
             * Если не передали свойство HTMLElement,
             * то делаем поиск по селектору элемента и вызываем для него экземпляр компонента
             */
            if (!props.$element) {
                return new props.Component({
                    ...props,
                    $element: document.querySelectorAll(props.selectors.element)
                });
            }
            this.$element = props.$element instanceof Element ? props.$element : document.querySelector(props.$element);
            if (!this.$element) {
                throw Error(`Не найден HTMLElement ${this.constructor.name}`);
            }
            this.options = {
                mount: true,
                name: this.$element.dataset.name || props.options && props.options.name || ''
            };
            this.on = {
                mount: () => { },
                render: () => { },
                destroy: () => { },
                unmount: () => { },
            };
            this.selectors = props.selectors;
            this.emitter = props.emitter || new EventEmitter_1.default();
            this.options = Object.assign(this.options, props.options || {});
            this.on = Object.assign(this.on, props.on || {});
        }
        mount() {
            this.$element.setAttribute('data-mount', 'true');
            this._mount = true;
        }
        getByName(components, name) {
            return components.filter(component => component.options.name === name)[0];
        }
        unmount() {
            this._mount = false;
            this.$element.removeAttribute('data-mount');
        }
    }
    exports.default = Component;
});
define("lib/components/Tooltip", ["require", "exports", "config/index", "lib/core/Component"], function (require, exports, config_4, Component_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    config_4 = __importDefault(config_4);
    Component_4 = __importDefault(Component_4);
    const selectors = {
        element: `.${config_4.default.prefix}-tooltip`,
        content: `.${config_4.default.prefix}-tooltip-content`,
        wrapper: `.${config_4.default.prefix}-tooltip-wrapper`,
        header: `.${config_4.default.prefix}-tooltip-header`
    };
    class Tooltip extends Component_4.default {
        // options: ITooltipOptions;
        constructor(props = {}) {
            super({
                ...props,
                Component: Tooltip,
                selectors: Object.assign(selectors, props.selectors || {})
            });
            if (this.options && this.options.mount) {
                this.mount();
            }
        }
        mount() {
            if (!this.$element || this._mount || this.$element.hasAttribute('data-mount'))
                return;
            super.mount();
            this.options = Object.assign({}, this.options);
            this.handlers = {
                mouseOverHandler: this.mouseOverHandler.bind(this),
                mouseOutHandler: this.mouseOutHandler.bind(this),
                clickHandler: this.clickHandler.bind(this),
            };
            this.addEvents();
            this.on.mount(this);
            this.emitter.emit('mount', this);
        }
        addEvents() {
            this.$element.addEventListener('mouseover', this.handlers.mouseOverHandler);
            this.$element.addEventListener('mouseout', this.handlers.mouseOutHandler);
            this.$element.addEventListener('click', this.handlers.clickHandler);
        }
        mouseOverHandler() {
            this.$element.toggleAttribute('data-active');
            this.on.render(this);
            this.emitter.emit('render', this);
        }
        mouseOutHandler() {
            this.$element.removeAttribute('data-active');
            this.on.destroy(this);
            this.emitter.emit('destroy', this);
        }
        clickHandler() {
            this.$element.toggleAttribute('data-active');
            if (this.$element.hasAttribute('data-active')) {
                this.on.render(this);
                this.emitter.emit('render', this);
            }
            else {
                this.on.destroy(this);
                this.emitter.emit('destroy', this);
            }
        }
        unmount() {
            super.unmount();
            this.$element.removeEventListener('mouseover', this.handlers.mouseOverHandler);
            this.$element.removeEventListener('mouseout', this.handlers.mouseOutHandler);
            this.$element.removeEventListener('click', this.handlers.clickHandler);
            this.on.unmount(this);
            this.emitter.emit('unmount', this);
        }
    }
    exports.default = Tooltip;
});
define("lib/components/Tab", ["require", "exports", "lib/core/Component", "config/index"], function (require, exports, Component_5, config_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Component_5 = __importDefault(Component_5);
    config_5 = __importDefault(config_5);
    const selectors = {
        element: `.${config_5.default.prefix}-tabs`,
        list: `.${config_5.default.prefix}-tabs-list`,
        tab: `.${config_5.default.prefix}-tab`,
        wrapper: `.${config_5.default.prefix}-tab-wrapper`,
        content: `.${config_5.default.prefix}-tab-content`
    };
    class Tab extends Component_5.default {
        constructor(props = {}) {
            super({
                ...props,
                Component: Tab,
                selectors: Object.assign(selectors, props.selectors || {})
            });
            if (this.options && this.options.mount) {
                this.mount();
            }
        }
        mount() {
            if (!this.$element || this._mount || this.$element.hasAttribute('data-mount'))
                return;
            super.mount();
            this.options = Object.assign({
                active: this.$element.dataset.active || false
            }, this.options);
            this.on = Object.assign({
                toggle: () => { }
            }, this.on);
            this.handlers = {
                change: this.change.bind(this),
            };
            this.$tabs = this.$element.querySelectorAll(this.selectors.tab);
            this.$contents = this.$element.querySelectorAll(this.selectors.content);
            this.addEvents();
            if (this.options.active) {
                this.toggle(this.$tabs[0], Array.prototype.filter.call(this.$contents, item => item.dataset.tab === this.$tabs[0].dataset.target)[0], false);
            }
            this.on.mount(this);
            this.emitter.emit('mount', this);
        }
        addEvents() {
            this.$tabs.forEach(tab => tab.addEventListener('click', this.handlers.change));
        }
        change(e) {
            const tab = e.target;
            const content = Array.prototype.filter.call(this.$contents, item => item.dataset.tab === e.target.dataset.target)[0];
            if (!tab.hasAttribute('data-active') || !content.hasAttribute('data-active')) {
                this.toggle(tab, content);
            }
        }
        toggle(tab, content, lifeCycle = true) {
            this.$tabs.forEach(item => item.removeAttribute('data-active'));
            this.$contents.forEach(item => item.removeAttribute('data-active'));
            tab.toggleAttribute('data-active');
            content.toggleAttribute('data-active');
            if (lifeCycle) {
                this.emitter.emit('toggle', this);
                this.on.toggle(this);
            }
        }
        unmount() {
            super.unmount();
            this.$tabs.forEach(tab => tab.removeEventListener('click', this.handlers.change));
            this.on.unmount(this);
            this.emitter.emit('unmount', this);
        }
    }
    exports.default = Tab;
});
define("lib/utils/createTemplate", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const createTemplate = (content) => {
        const template = document.createElement('template');
        template.insertAdjacentHTML('afterbegin', content);
        return template.lastElementChild;
    };
    exports.default = createTemplate;
});
define("lib/utils/event", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const event = {
        transitionEnd() {
            var t, el = document.createElement("fakeelement");
            var transitions = {
                "transition": "transitionend",
                "OTransition": "oTransitionEnd",
                "MozTransition": "transitionend",
                "WebkitTransition": "webkitTransitionEnd"
            };
            for (t in transitions) {
                const idx = t;
                if (el.style[idx] !== undefined) {
                    return transitions[idx];
                }
            }
        },
        animationEnd() {
            var t, el = document.createElement("fakeelement");
            var animations = {
                "animation": "animationend",
                "OAnimation": "oAnimationEnd",
                "MozAnimation": "animationend",
                "WebkitAnimation": "webkitAnimationEnd"
            };
            for (t in animations) {
                const idx = t;
                if (el.style[idx] !== undefined) {
                    return animations[idx];
                }
            }
        }
    };
    exports.default = event;
});
define("lib/components/Modal", ["require", "exports", "lib/core/Component", "config/index", "lib/utils/createTemplate", "lib/utils/event"], function (require, exports, Component_6, config_6, createTemplate_1, event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Component_6 = __importDefault(Component_6);
    config_6 = __importDefault(config_6);
    createTemplate_1 = __importDefault(createTemplate_1);
    event_1 = __importDefault(event_1);
    const selectors = {
        element: `.${config_6.default.prefix}-modal`,
        overlay: `.${config_6.default.prefix}-modal-overlay`,
        content: `.${config_6.default.prefix}-modal-content`,
        close: `.${config_6.default.prefix}-modal-close`,
        btnTarget: `data-modal-target`,
    };
    class Modal extends Component_6.default {
        constructor(props = {}) {
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
            if (!this.$element || this._mount || this.$element.hasAttribute('data-mount'))
                return;
            super.mount();
            this.options = Object.assign({
                adaptive: this.$element.dataset.adaptive || true,
                // type: this.$element.dataset.type || 'line',
            }, this.options);
            this.handlers = {
            // change: this.change.bind(this)
            };
            this.isRender = false;
            this.$overlay = createTemplate_1.default(`<div class="${this.selectors.overlay.replace('.', '')}"></div>`);
            this.$close = this.$element.querySelector(this.selectors.close);
            this.$btnTarget = this.props.elements && this.props.elements.$btnTarget || document.querySelector(`[${this.selectors.btnTarget}="${this.options.name}"]`);
            this.$container = this.props.elements && this.props.elements.$container || document.querySelector(`body`);
            this.addEvents();
            this.on.mount(this);
            this.emitter.emit('mount', this);
        }
        addEvents() {
            if (this.options.adaptive) {
                this.$element.setAttribute('data-adaptive', '');
            }
            if (this.$btnTarget) {
                this.$btnTarget.addEventListener('click', e => this.render());
            }
            this.$overlay.addEventListener('click', this.destroy.bind(this));
            this.$close.addEventListener('click', this.destroy.bind(this));
        }
        unmount() {
            super.unmount();
            this.on.unmount(this);
            this.emitter.emit('unmount', this);
        }
        render() {
            document.querySelector('body').style.setProperty('overflow', 'hidden');
            this.$container.appendChild(this.$overlay);
            this.$container.appendChild(this.$element);
            this.isRender = true;
            this.on.render(this);
            this.emitter.emit('render', this);
            setTimeout(() => {
                this.$overlay.setAttribute('data-active', '');
                this.$element.setAttribute('data-active', '');
            }, 10);
        }
        destroy() {
            if (!this.isRender) {
                return;
            }
            this.$overlay.addEventListener(event_1.default.transitionEnd(), () => {
                this.$overlay.removeAttribute('data-closing');
                this.$element.removeAttribute('data-closing');
                this.$overlay.removeAttribute('data-active');
                this.$element.removeAttribute('data-active');
                this.$overlay.remove();
                this.$element.remove();
            }, { once: true });
            this.$overlay.setAttribute('data-closing', '');
            this.$element.setAttribute('data-closing', '');
            this.isRender = false;
            this.on.destroy(this);
            this.emitter.emit('destroy', this);
            document.querySelector('body').style.removeProperty('overflow');
        }
    }
    exports.default = Modal;
});
define("lib/components/Progress", ["require", "exports", "lib/core/Component", "config/index"], function (require, exports, Component_7, config_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Component_7 = __importDefault(Component_7);
    config_7 = __importDefault(config_7);
    const selectors = {
        element: `.${config_7.default.prefix}-progress`,
        percent: `.${config_7.default.prefix}-progress-percent`,
        bar: `.${config_7.default.prefix}-progress-bar`
    };
    class Progress extends Component_7.default {
        constructor(props = {}) {
            super({
                ...props,
                Component: Progress,
                selectors: Object.assign(selectors, props.selectors || {})
            });
            if (this.options && this.options.mount) {
                this.mount();
            }
        }
        mount() {
            if (!this.$element || this._mount || this.$element.hasAttribute('data-mount'))
                return;
            super.mount();
            this.options = Object.assign({
                percent: this.$element.dataset.percent || 0,
                type: this.$element.dataset.type || 'line',
            }, this.options);
            this.handlers = {
                change: this.change.bind(this)
            };
            this.$percent = this.$element.querySelector(this.selectors.percent);
            this.$bar = this.$element.querySelector(this.selectors.bar);
            this.addEvents();
            this.on.mount(this);
            this.emitter.emit('mount', this);
        }
        addEvents() {
            this.change(this.getPercent(), false);
        }
        // unmount() {
        //     super.unmount()
        //     this.on.unmount(this)
        //     this.emitter.emit('unmount', this)
        // }
        change(value, lifecycle = true) {
            if (value >= 100) {
                this.options.percent = 100;
            }
            else if (value <= 0) {
                this.options.percent = 0;
            }
            else {
                this.options.percent = value;
            }
            if (this.options.type === 'line') {
                this.$bar.setAttribute('style', `width:${this.options.percent}%`);
                this.$percent.innerText = this.options.percent + '%';
            }
            else if (this.options.type === 'ring') {
            }
            if (lifecycle) {
                this.on.change(this);
                this.emitter.emit('change', this);
            }
        }
        getPercent() {
            return this.options.percent;
        }
    }
    // class Progress {
    //     constructor(props) {
    //         this.props = props
    //         this.state = {
    //             name: '',
    //             percent: 0,
    //             type: 'line',
    //             progress: null,
    //             progressPercent: null,
    //             progressBar: null,
    //             progressTag: {},
    //             progressPercentTag: {},
    //             progressBarTag: {},
    //             ring: null,
    //             ringFill: null,
    //             ringCircle: null,
    //             ringWidth: 3,
    //             ringRadius: 30,
    //             ringFillColor: '#F3F1F0',
    //             ringColor: '#A3A2A1'
    //         }
    //         this.state = utils.object.extend(this.state, this.props)
    //         this.init()
    //     }
    //     /**
    //      * Инициализация Progress
    //      */
    //     init() {
    //         if (this.state.progress) {
    //             this.state.progress.setAttribute('data-percent', this.state.percent);
    //             this.state.progress.setAttribute('am-progress', this.state.name);
    //             for (let key in this.state.progressTag) {
    //                 this.state.progress.setAttribute(key, this.state.progressTag[key]);
    //             }
    //             const progressBar = this.state.progress.querySelector('[am-progress-bar]');
    //             const progressPercent = this.state.progress.querySelector('[am-progress-percent]');
    //             if (progressBar) {
    //                 this.state.progressBar = progressBar;
    //                 this.state.progressBar.setAttribute('style', `width:${this.state.percent}%`);
    //                 for (let key in this.state.progressBarTag) {
    //                     this.state.progressBar.setAttribute(key, this.state.progressBarTag[key]);
    //                 }
    //             }
    //             if (progressPercent) {
    //                 this.state.progressPercent = progressPercent;
    //                 this.state.progressPercent.innerText = this.state.percent + '%';
    //                 for (let key in this.state.progressPercentTag) {
    //                     this.state.progressPercent.setAttribute(key, this.state.progressPercentTag[key]);
    //                 }
    //             }
    //         } else if(this.state.ring) {
    //             const normalizedRadius = this.state.ringRadius - this.state.ringWidth * 2;
    //             const circumference = normalizedRadius * 2 * Math.PI;
    //             const offset = circumference - (this.state.percent / 100 * circumference);
    //             const circle = this.state.ringCircle || this.state.ring.querySelector('circle');
    //             const circleFill = this.state.ringFill || this.state.ring.querySelector('> circle');
    //             this.state.ring.setAttributes({
    //                 'am-progress-ring': this.state.name,
    //                 'width': this.state.ringRadius * 2,
    //                 'height': this.state.ringRadius * 2
    //             })
    //             circle.setAttributes({
    //                 'stroke': this.state.ringColor,
    //                 'stroke-dasharray': circumference,
    //                 'stroke-width': this.state.ringWidth,
    //                 'fill': 'transparent',
    //                 'r': normalizedRadius,
    //                 'cx': this.state.ringRadius,
    //                 'cy': this.state.ringRadius,
    //                 'style': 'stroke-dashoffset:'+offset
    //             })
    //             circleFill.setAttributes({
    //                 'stroke': this.state.ringFillColor,
    //                 'stroke-dasharray': circumference,
    //                 'stroke-width': this.state.ringWidth,
    //                 'fill': 'transparent',
    //                 'r': normalizedRadius,
    //                 'cx': this.state.ringRadius,
    //                 'cy': this.state.ringRadius,
    //                 'style': 'stroke-dashoffset:0'
    //             })
    //         }
    //     }
    //     /**
    //      * Создает Progress
    //      */
    //     build() {
    //         if (this.state.type === 'line') {
    //             const progressBar = utils.element.create('div', {'am-progress-bar': '', 'style': `width:${this.state.percent}%`, ...this.state.progressBarTag});
    //             const progressPercent = utils.element.create('span', {'am-progress-percent': '', ...this.state.progressPercentTag}, [], `${this.state.percent}%`);
    //             const progress = utils.element.create('div', {'am-progress': this.state.name, 'data-percent': this.state.percent, ...this.state.progressTag}, [progressPercent, progressBar]);
    //             this.state.progress = progress;
    //             this.state.progressBar = progressBar;
    //             this.state.progressPercent = progressPercent;
    //             return progress;
    //         } else if (this.state.type === 'ring') {
    //             const normalizedRadius = this.state.ringRadius - this.state.ringWidth * 2;
    //             const circumference = normalizedRadius * 2 * Math.PI;
    //             const offset = circumference - (this.state.percent / 100 * circumference);
    //             const circle = utils.element.create('circle', {
    //                 stroke: this.state.ringColor,
    //                 'stroke-dasharray': circumference,
    //                 style: `stroke-dashoffset: ${offset}`,
    //                 'stroke-width': this.state.ringWidth,
    //                 fill: 'transparent',
    //                 r: normalizedRadius,
    //                 cx: this.state.ringRadius,
    //                 cy: this.state.ringRadius,
    //             }, [], false, 'http://www.w3.org/2000/svg');
    //             const circleFill = utils.element.create('circle', {
    //                 stroke: this.state.ringFillColor,
    //                 'stroke-dasharray': circumference,
    //                 style: `stroke-dashoffset: 0`,
    //                 'stroke-width': this.state.ringWidth,
    //                 fill: 'transparent',
    //                 r: normalizedRadius,
    //                 cx: this.state.ringRadius,
    //                 cy: this.state.ringRadius,
    //             }, [], false, 'http://www.w3.org/2000/svg');
    //             const svg = utils.element.create('svg', {'am-progress-ring': this.state.name, width: this.state.ringRadius * 2, height: this.state.ringRadius * 2}, [circleFill, circle], false, 'http://www.w3.org/2000/svg');
    //             this.state.ring = svg;
    //             this.state.ringCircle = circle;
    //             this.state.ringFill = circleFill;
    //             return svg;
    //         }
    //         return utils.element.create('div', {hidden: true});
    //     }
    //     /**
    //      * Устанавливает процент
    //      * @param {Number} value значение прогресса 0-100
    //      */
    //     setPercent(value) {
    //         if (value >= 100) {
    //             this.state.percent = 100;
    //         } else if (value <= 0) {
    //             this.state.percent = 0;
    //         } else {
    //             this.state.percent = value;
    //         }
    //         this.init()
    //     }
    //     /**
    //      * Возврашает текущий процент
    //      * @returns {number} percent
    //      */
    //     getPercent() {
    //         return this.state.percent;
    //     }
    //     /**
    //      * Устанавливает элемент для Progress
    //      * @param {HTMLElement} progress
    //      */
    //     setProgress(progress) {
    //         this.state.progress = progress;
    //         this.init()
    //     }
    //     /**
    //      * Устанавливает элемент для Progress (кольцевой)
    //      * @param {HTMLElement} ring
    //      */
    //     setRing(ring) {
    //         this.state.progress = ring;
    //         this.init()
    //     }
    //     /**
    //      * Возвращает Progress
    //      * @returns {HTMLElement} line
    //      */
    //     getProgress() {
    //         return this.state.progress;
    //     }
    //     /**
    //      * Возвращает Progress (ring)
    //      * @returns {HTMLElement} ring
    //      */
    //     getRing() {
    //         return this.state.ring;
    //     }
    //     /**
    //      * Скрывает Progress
    //      */
    //     hide() {
    //         if (this.state.ring) {
    //             this.state.ring.setAttribute('hidden', '')
    //         }
    //         if (this.state.progress) {
    //             this.state.progress.setAttribute('hidden', '')
    //         }
    //     }
    //     /**
    //      * Показывает Progress
    //      */
    //     show() {
    //         if (this.state.ring) {
    //             this.state.ring.removeAttribute('hidden')
    //         }
    //         if (this.state.progress) {
    //             this.state.progress.removeAttribute('hidden')
    //         }
    //     }
    // }
    exports.default = Progress;
});
define("lib/components/Select", ["require", "exports", "lib/core/Component", "config/index"], function (require, exports, Component_8, config_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Component_8 = __importDefault(Component_8);
    config_8 = __importDefault(config_8);
    const selectors = {
        element: `.${config_8.default.prefix}-select`,
        wrapper: `.${config_8.default.prefix}-select-wrapper`,
        value: `.${config_8.default.prefix}-select-value`,
        items: `.${config_8.default.prefix}-select-items`,
        item: `.${config_8.default.prefix}-select-item`,
        input: `.${config_8.default.prefix}-select-input`,
        current: `.${config_8.default.prefix}-select-current`,
    };
    class Select extends Component_8.default {
        constructor(props = {}) {
            super({
                ...props,
                Component: Select,
                selectors: Object.assign(selectors, props.selectors || {})
            });
            if (this.options && this.options.mount) {
                this.mount();
            }
        }
        mount() {
            if (!this.$element || this._mount || this.$element.hasAttribute('data-mount'))
                return;
            super.mount();
            this.options = Object.assign({
                active: this.$element.dataset.active || false
            }, this.options);
            this.on = Object.assign({
                toggle: () => { },
                change: () => { }
            }, this.on);
            this.handlers = {
                toggle: this.toggle.bind(this),
                documentClickHandler: this.documentClickHandler.bind(this),
                change: this.change.bind(this)
            };
            this.value = this.options && this.options.value || null;
            this.items = this.options && this.options.items || null;
            this.$input = this.$element.querySelector(this.selectors.input);
            this.$value = this.$element.querySelector(this.selectors.value);
            this.$items = this.$element.querySelector(this.selectors.items);
            this.$itemList = this.$items.querySelectorAll(this.selectors.item);
            this.addEvents();
            this.on.mount(this);
            this.emitter.emit('mount', this);
        }
        addEvents() {
            this.$value.addEventListener('click', this.handlers.toggle);
            document.addEventListener('click', this.handlers.documentClickHandler);
            this.$itemList.forEach($item => $item.addEventListener('click', this.handlers.change));
        }
        documentClickHandler(e) {
            if (!e.target.closest(this.selectors.element) && this.$element.hasAttribute('data-active')) {
                this.$element.toggleAttribute('data-active');
                this.on.toggle(this);
                this.emitter.emit('toggle', this);
            }
        }
        toggle() {
            this.$element.toggleAttribute('data-active');
            this.on.toggle(this);
            this.emitter.emit('toggle', this);
        }
        close() {
            this.$element.removeAttribute('data-active');
        }
        change(e) {
            const $current = this.$items.querySelector('[data-selected]');
            const $item = e.target.closest(this.selectors.item);
            const value = $item.dataset.value.trim();
            const label = $item.innerHTML.toString().trim();
            if ($item.hasAttribute('data-selected')) {
                return;
            }
            if ($current) {
                $current.removeAttribute('data-selected');
            }
            $item.setAttribute('data-selected', '');
            this.value = {
                value,
                label
            };
            this.$input.value = value;
            this.$value.setAttribute('data-value', value);
            this.$value.innerHTML = label;
            this.close();
            this.on.change(this);
            this.emitter.emit('change', this);
        }
        unmount() {
            super.unmount();
            this.on.unmount(this);
            this.emitter.emit('unmount', this);
        }
    }
    exports.default = Select;
});
define("jcore-ui", ["require", "exports", "lib/components/Accordion", "lib/components/Collapse", "lib/components/Dropdown", "lib/components/Modal", "lib/components/Progress", "lib/components/Select", "lib/components/Tab", "lib/components/Tooltip", "lib/core/Component", "lib/utils/createTemplate", "lib/utils/event", "lib/utils/EventEmitter"], function (require, exports, Accordion_1, Collapse_1, Dropdown_1, Modal_1, Progress_1, Select_1, Tab_1, Tooltip_1, Component_9, createTemplate_2, event_2, EventEmitter_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventEmitter = exports.event = exports.createTemplate = exports.Component = exports.Tooltip = exports.Tab = exports.Select = exports.Progress = exports.Modal = exports.Dropdown = exports.Collapse = exports.Accordion = void 0;
    Accordion_1 = __importDefault(Accordion_1);
    Collapse_1 = __importDefault(Collapse_1);
    Dropdown_1 = __importDefault(Dropdown_1);
    Modal_1 = __importDefault(Modal_1);
    Progress_1 = __importDefault(Progress_1);
    Select_1 = __importDefault(Select_1);
    Tab_1 = __importDefault(Tab_1);
    Tooltip_1 = __importDefault(Tooltip_1);
    Component_9 = __importDefault(Component_9);
    createTemplate_2 = __importDefault(createTemplate_2);
    event_2 = __importDefault(event_2);
    EventEmitter_2 = __importDefault(EventEmitter_2);
    exports.Accordion = Accordion_1.default;
    exports.Collapse = Collapse_1.default;
    exports.Dropdown = Dropdown_1.default;
    exports.Modal = Modal_1.default;
    exports.Progress = Progress_1.default;
    exports.Select = Select_1.default;
    exports.Tab = Tab_1.default;
    exports.Tooltip = Tooltip_1.default;
    exports.Component = Component_9.default;
    exports.createTemplate = createTemplate_2.default;
    exports.event = event_2.default;
    exports.EventEmitter = EventEmitter_2.default;
});
//# sourceMappingURL=index.js.map