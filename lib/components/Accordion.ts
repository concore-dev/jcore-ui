import Component, { IComponent, IComponentOn, IComponentOptions, IComponentSelector } from "../core/Component";
import config from '../../config';
import { IObject } from "../interfaces";
import { $, JDom } from "../core/JDom";

const selectors = {
    element: `.${config.prefix}-accordion`,
    panel: `.${config.prefix}-accordion-panel`,
    tab: `.${config.prefix}-accordion-tab`,
    content: `.${config.prefix}-accordion-content`
}

interface IAccordionSelector extends IComponentSelector {
    panel?: string;
    tab?: string;
    content?: string;
}

interface IAccordionOptions extends IComponentOptions {
    active?: boolean;
    multiple?: boolean;
    duration?: number;
}

interface IAccordionOn extends IComponentOn {
    toggle?: (ctx?: Component) => void;
}

interface IAccordion extends IComponent {
    selectors?: IAccordionSelector;
    options?: IAccordionOptions;
    on?: IAccordionOn;
}

interface Accordion {
    options: IAccordionOptions;
    $tabs: JDom;
    selectors: IAccordionSelector;
    on: IAccordionOn;
    id: number;
    isShow: boolean;
    isShowTabs: IObject[];
    $tab: JDom;
}

class Accordion extends Component {
    constructor(props: IAccordion = {}) {
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
        if (!this.$element || this._mount || this.$element.hasAttr('data-mount')) {
            return;
        };

        super.mount();

        this.options = Object.assign({
            active: this.$element.dataset.active || false,
            multiple: this.$element.dataset.multiple || false,
            duration: this.$element.dataset.duration || 300
        }, this.options);

        this.on = Object.assign({
            toggle: () => {}
        }, this.on);

        this.handlers = {
            // change: this.change.bind(this),
            resize: this.resize.bind(this),
            toggle: this.toggle.bind(this)
        };

        this.id = 0;
        this.$tab = null;
        this.isShow = false;
        this.isShowTabs = [];

        this.$tabs = $(this.$element).find(this.selectors.tab);

        this.addEvents();

        this.on.mount(this);
        this.emitter.emit('mount', this);
    }

    addEvents() {
        this.$tabs.element.forEach((tab, i) => {
            const $tab = $(tab);
            const panel = $tab.closest(this.selectors.panel);
            const content = $(panel).find(this.selectors.content);
            const id = this.setId($tab);

            content.style.setProperty('transition', `height ease-in-out ${this.options.duration}ms`);
            this.isShowTabs.push({ tab, id, isShow: false });

            if (this.options.active && i === 0) {
                this.toggle($tab, content);
            }

            $tab.on('click', this.handlers.toggle);
        })

        window.addEventListener('resize', this.handlers.resize);
    }

    unmount() {
        super.unmount();

        this.$tabs.element.forEach(tab => $(tab).off('click', this.handlers.toggle, null));
        window.removeEventListener('resize', this.handlers.resize);

        this.on.unmount(this);
        this.emitter.emit('unmount', this);
    }

    toggle(e: Event | JDom, cont?: JDom) {
        const tab = $((e instanceof HTMLElement ? e : (e as Event).target as unknown as JDom)).closest(this.selectors.tab);
        const panel = tab.closest(this.selectors.panel);
        const content = cont || panel.find(this.selectors.content);

        // Если последний активный таб не равен текущему, сбрасываем состояние
        if (this.$tab?.get() !== tab.get() && !this.options.multiple && this.$tabs.element.length > 1) {
            this.isShow = false;

            // если в аккордеоне несколько панелей, скрываем все, кроме текущей
            this.hideAll(tab);
        }

        // Если multiple не вклчюен, то у всех общее состояние
        if (!this.options.multiple) {
            if (this.isShow) {
                this.hide(tab, content);
            } else {
                this.show(tab, content);
            }

            this.isShow = !this.isShow;
        } else {
            const tabParam = this.isShowTabs.filter(param => param.tab === tab)[0];

            if (tabParam.isShow) {
                this.setShowTab(tab, false);
                this.hide(tab, content);
            } else {
                this.setShowTab(tab, true);
                this.show(tab, content);
            }

            this.isShow = !this.isShow;
        }

        this.on.toggle(this);
        this.emitter.emit('toggle', this);
    }

    setId(tab: JDom) {
        tab.attr('data-id', `${this.id++}`);
        return this.id;
    }

    show(tab: JDom, content: JDom) {
        const height = content.scrollHeight;
        this.$tab = tab;

        $(this.$element).attr('data-active', '');
        tab.attr('data-active', '');
        // content.attr('showing', '');

        this.setHeight(`${height}px`, content);

        setTimeout(() => {
            this.showEnd(content);
        }, this.options.duration);
    }

    showEnd(content: JDom) {
        // content.removeAttr('showing');
        // content.attr('show', '');

        this.emitter.emit('show', this);
        // content.style.setProperty('height', `auto`)
    }

    hide(tab: JDom, content: JDom) {
        // content.attr('hiding', '');
        tab.attr('data-active',);
        $(this.$element).attr('data-active', null);

        this.setHeight(0, content);

        setTimeout(() => {
            this.hideEnd(content);
        }, this.options.duration);
    }

    hideEnd(content: JDom) {
        // content.removeAttr('show');
        // content.removeAttr('hiding');

        this.emitter.emit('hide', this);
    }

    hideAll(currentTab: JDom) {
        if (currentTab) {
            const needTabsHidden = this.$tabs.element.filter(tab => tab !== currentTab.get());

            needTabsHidden.forEach(tab => {
                const panel = $(tab).closest(this.selectors.panel);
                const content = panel.find(this.selectors.content);

                // content.removeAttr('showing');
                // content.removeAttr('show');
                // content.removeAttr('hiding');
                $(tab).attr('data-active', null);

                this.setHeight(0, content);
            });

            this.$tab = currentTab;
        } else {
            this.$tabs.element.forEach(tab => {
                const panel = $(tab).closest(this.selectors.panel);
                const content = panel.find(this.selectors.content);

                // content.removeAttr('showing');
                // content.removeAttr('show');
                // content.removeAttr('hiding');
                $(tab).attr('data-active', null);

                this.setHeight(0, content);
            });

            this.$tab = null;
        }
    }

    setHeight(height: string | number | HTMLElement, content: JDom) {
        content.style.setProperty('height', `${content.scrollHeight}px`);

        window.requestAnimationFrame(() => {
            content.style.setProperty('height', `${height}`);
        });
    }

    setShowTab(tab: JDom, state: boolean) {
        const needTab = this.isShowTabs.filter(param => param.tab === tab.get())[0];

        this.isShowTabs = this.isShowTabs.map(param => {
            if (param.tab === needTab.tab) {
                param.isShow = state;
            }

            return param;
        });
    }

    resize() {
        this.$tabs.element.forEach((tab, i) => {
            const $tab = $(tab);

            if (!$tab.attr('data-active')) {
                return;
            }

            const panel = $tab.closest(this.selectors.panel);
            const content = panel.find(this.selectors.content);

            content.style.setProperty('height', `auto`);

            this.setHeight(tab, content);
        });
    }
}

export default Accordion