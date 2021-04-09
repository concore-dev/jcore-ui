import Component, { IComponent, IComponentOn, IComponentOptions, IComponentSelector } from "../core/Component";
import config from '../../config';
import { IObject } from "../interfaces";


const selectors = {
    element: `.${config.prefix}-accordion`,
    panel: `.${config.prefix}-accordion-panel`,
    tab: `.${config.prefix}-accordion-tab`,
    content: `.${config.prefix}-accordion-content`
}


interface IAccordionSelector extends IComponentSelector {
    panel: string;
    tab: string;
    content: string;
}


interface IAccordionOptions extends IComponentOptions {
    active?: boolean
    multiple?: boolean
    duration?: number,
}


interface IAccordionOn extends IComponentOn {
    toggle?: (ctx?: Component) => void;
}


interface IAccordion extends IComponent {
    selectors?: IAccordionSelector
    options?: IAccordionOptions
    on?: IAccordionOn
}


interface Accordion {
    // handlers?: IObject;
    options: IAccordionOptions;
    // $list: HTMLElement
    $tabs: NodeListOf<HTMLElement>
    // $contents: NodeListOf<HTMLElement>
    selectors: IAccordionSelector
    on: IAccordionOn
    id: number
    isShow: boolean
    isShowTabs: IObject[]
    tab: HTMLElement
}


class Accordion extends Component {
    constructor(props: IAccordion = {}) {
        super({
            ...props,
            Component: Accordion,
            selectors: Object.assign(selectors, props.selectors || {})
        })

        if (this.options && this.options.mount) {
            this.mount()
        }
    }

    mount() {
        if (!this.$element || this._mount || this.$element.hasAttribute('data-mount')) return;
        super.mount()

        this.options = Object.assign({
            active: false,
            multiple: false,
            duration: 300
        }, this.options)

        this.on = Object.assign({
            toggle: () => {}
        }, this.on)

        this.handlers = {
            // change: this.change.bind(this),
        }

        this.id = 0
        this.tab = null
        this.isShow = false
        this.isShowTabs = []

        this.$tabs = this.$element.querySelectorAll(this.selectors.tab);

        this.addEvents()

        this.on.mount(this)
        this.emitter.emit('mount', this)
    }

    addEvents() {
        this.$tabs.forEach((tab, i) => {
            const panel = tab.closest(this.selectors.panel)
            const content = panel.querySelector<HTMLElement>(this.selectors.content)
            const id = this.setId(tab)

            content.style.setProperty('transition', `height ease-in-out ${this.options.duration}ms`)
            this.isShowTabs.push({ tab, id, isShow: false })

            if (this.options.active && i === 0) {
                this.toggle(tab, content)
            }

            tab.addEventListener('click', () => this.toggle(tab, content))
        })

        const resize = this.onResize.bind(this)
        window.addEventListener('resize', resize)
    }

    unmount() {
        super.unmount()

        // this.$tabs.forEach(tab => tab.removeEventListener('click', this.handlers.change))

        this.on.unmount(this)
        this.emitter.emit('unmount', this)
    }

    toggle(tab: HTMLElement, content: HTMLElement) {
        // Если последний активный таб не равен текущему, сбрасываем состояние
        if (this.tab !== tab && !this.options.multiple && this.$tabs.length > 1) {
            this.isShow = false

            // если в аккордеоне много панелей, скрываем все, кроме текущей
            this.hideAll(tab)
        }

        // Если multiple не вклчюен, то у всех общее состояние
        if (!this.options.multiple) {
            if (this.isShow) {
                this.hide(tab, content)
            } else {
                this.show(tab, content)
            }

            this.isShow = !this.isShow
        } else {
            const tabParam = this.isShowTabs.filter(param => param.tab === tab)[0]

            if (tabParam.isShow) {
                this.setShowTab(tab, false)
                this.hide(tab, content)
            } else {
                this.setShowTab(tab, true)
                this.show(tab, content)
            }

            this.isShow = !this.isShow
        }

        this.on.toggle(this)
        this.emitter.emit('toggle', this)
    }

    setId(tab: HTMLElement) {
        tab.setAttribute('data-id', `${this.id++}`)
        return this.id
    }

    show(tab: HTMLElement, content: HTMLElement) {
        const height = content.scrollHeight

        tab.setAttribute('data-active', '')
        // this.$panels.setAttribute('active', '')
        content.setAttribute('showing', '')

        this.setHeight(`${height}px`, content)

        setTimeout(() => {
            this.showEnd(tab, content)
        }, this.options.duration);
    }

    showEnd(tab: HTMLElement, content: HTMLElement) {
        content.removeAttribute('showing')
        content.setAttribute('show', '')

        this.emitter.emit('show', this)
        // content.style.setProperty('height', `auto`)
    }

    hide(tab: HTMLElement, content: HTMLElement) {
        content.setAttribute('hiding', '')
        tab.removeAttribute('data-active')

        this.setHeight(0, content)

        setTimeout(() => {
            this.hideEnd(tab, content)
        }, this.options.duration);
    }

    hideEnd(tab: HTMLElement, content: HTMLElement) {
        content.removeAttribute('show')
        content.removeAttribute('hiding')
        // this.$panels.removeAttribute('active')

        this.emitter.emit('hide', tab, content)
    }

    hideAll(currentTab: HTMLElement) {
        if (currentTab) {
            const needTabsHidden = Array.prototype.filter.call(this.$tabs, tab => tab !== currentTab)

            needTabsHidden.forEach(tab => {
                const panel = tab.closest(this.selectors.panel)
                const content = panel.querySelector(this.selectors.content)

                content.removeAttribute('showing')
                content.removeAttribute('show', '')
                content.removeAttribute('hiding')
                tab.removeAttribute('active')

                this.setHeight(0, content)
            });

            this.tab = currentTab
        } else {
            this.$tabs.forEach(tab => {
                const panel = tab.closest(this.selectors.panel)
                const content = panel.querySelector<HTMLElement>(this.selectors.content)

                content.removeAttribute('showing')
                content.removeAttribute('show')
                content.removeAttribute('hiding')
                tab.removeAttribute('active')

                this.setHeight(0, content)
            });

            this.tab = null
        }
    }

    setHeight(height: string | number | HTMLElement, content: HTMLElement) {
        content.style.setProperty('height', `${content.scrollHeight}px`)

        window.requestAnimationFrame(() => {
            content.style.setProperty('height', `${height}`)
        });
    }

    setShowTab(tab: HTMLElement, state: boolean) {
        const needTab = this.isShowTabs.filter(param => param.tab === tab)[0]

        this.isShowTabs = this.isShowTabs.map(param => {
            if (param.tab === needTab.tab) {
                param.isShow = state
            }

            return param
        })
    }

    onResize() {
        this.$tabs.forEach((tab, i) => {
            if (!tab.hasAttribute('active')) return

            const panel = tab.closest(this.selectors.panel)
            const content = panel.querySelector<HTMLElement>(this.selectors.content)

            content.style.setProperty('height', `auto`)

            this.setHeight(tab, content)
        })
    }
}


export default Accordion