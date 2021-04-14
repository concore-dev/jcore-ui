"use strict";
/*!
 * Jcore-ui v1.0.1 - Accordion
 * https://github.com/concore-dev/jcore-ui
 *
 * Copyright 2021 Eryomin Nickolay
 * Published under MIT License
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = __importDefault(require("../core/Component"));
const config_1 = __importDefault(require("../../config"));
const selectors = {
    element: `.${config_1.default.prefix}-accordion`,
    panel: `.${config_1.default.prefix}-accordion-panel`,
    tab: `.${config_1.default.prefix}-accordion-tab`,
    content: `.${config_1.default.prefix}-accordion-content`
};
class Accordion extends Component_1.default {
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
        const tab = (e instanceof HTMLElement ? e : e.target).closest(this.selectors.tab);
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
        this.$element.setAttribute('data-active', '');
        tab.setAttribute('data-active', '');
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
        this.$element.removeAttribute('data-active');
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
//# sourceMappingURL=Accordion.js.map