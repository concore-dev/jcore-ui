import utils from '@utils'
import EventEmitter from '@utils/EventEmitter'

class Accordion extends EventEmitter {
    constructor(element, props) {
        super()

        this.state = {
            class: '[am-accordion]',
            tabClass: '[am-accordion-tab]',
            contentClass: '[am-accordion-content]',
            panelClass: '[am-accordion-panel]',

            multiple: false,
            active: false, // Открывать первую панель {boolean}
            init: true,

            duration: 300,
        }

        this.id = 0

        this.state = utils.object.extend(this.state, props)
        this.isShow = false // Состояние активного аккордеона {boolean}
        this.isShowTabs = [] // Состояние всех панелей {Array} { tab, id, isShow }
        this.initialized = false

        // Если пришел массив элементов, создаем для каждого отдельный экземпляр
        if (Array.isArray(element)) {
            let array;

            if (element.length) {
                array = element.map(acc => new Accordion(acc, props));
            }

            return array;
        }

        this.$accordion = document.querySelector(this.state.class)

        if (typeof element === 'object') {
            this.$accordion = element
        } else if (typeof element === 'string') {
            this.$accordion = document.querySelector(element)
        }

        this.$tabs = this.$accordion.querySelectorAll(this.state.tabClass)
        this.tab = null
        this.$contents = null
        this.$panels = null

        if (this.state.init) {
            this.init()
        }
    }

    /**
     * Инициализация Accordion
     */
    init() {
        if (this.initialized) return

        try {
            // Навешиваем обработчик нажатий на вкладку
            this.$tabs.forEach((tab, i) => {
                const panel = tab.closest(this.state.panelClass)
                const content = panel.querySelector(this.state.contentClass)
                const id = this._setID(tab)

                content.style.setProperty('transition', `height ease-in-out ${this.state.duration}ms`)
                this.isShowTabs.push({ tab, id, isShow: false })

                if (this.state.active && i === 0) {
                    this.toggle(tab, content)
                }

                tab.addEventListener('click', () => this.toggle(tab, content))

                panel.setAttribute('init', '')
                this.initialized = true

                this.emit('init', tab, content)
            })

            const resize = this.onResize.bind(this)
            window.addEventListener('resize', resize)
        } catch (error) {
            console.log(`Error in Accordion (init): ${error}`)
        }
    }

    /**
     * Переключатель состояний
     * @param {HTMLELement} tab
     * @param {HTMLELement} content
     */
    toggle(tab, content) {
        try {
            // Если последний активный таб не равен текущему, сбрасываем состояние
            if (this.tab !== tab && !this.state.multiple && this.$tabs.length > 1) {
                this.isShow = false

                // если в аккордеоне много панелей, скрываем все, кроме текущей
                this.hideAll(tab)
            }

            // Если multiple не вклчюен, то у всех общее состояние
            if (!this.state.multiple) {
                if (this.isShow) {
                    this.hide(tab, content)
                } else {
                    this.show(tab, content)
                }

                this.isShow = !this.isShow
            } else {
                const tabParam = this.isShowTabs.filter(param => param.tab === tab)[0]

                if (tabParam.isShow) {
                    this._setShowTab(tab, false)
                    this.hide(tab, content)
                } else {
                    this._setShowTab(tab, true)
                    this.show(tab, content)
                }

                this.isShow = !this.isShow
            }

            this.emit('toggle', tab, content)
        } catch (error) {
            console.log(`Error in Tab (toggle): ${error}`)
        }
    }

    /**
     * Открывает аккордеон
     * @param {HTMLELement} tab
     * @param {HTMLELement} content
     */
    show(tab, content) {
        try {
            const height = content.scrollHeight

            tab.setAttribute('active', '')
            // this.$panels.setAttribute('active', '')
            content.setAttribute('showing', '')

            this._setHeight(`${height}px`, content)

            setTimeout(() => {
                this._showEnd(tab, content)
            }, this.state.duration);
        } catch (error) {
            console.log(`Error in Tab (show): ${error}`)
        }
    }

    /**
     * Вызывается после открытия
     * @param {HTMLELement} tab
     * @param {HTMLELement} content
     */
    _showEnd(tab, content) {
        try {
            content.removeAttribute('showing')
            content.setAttribute('show', '')

            this.emit('show', tab, content)
            // content.style.setProperty('height', `auto`)
        } catch (error) {
            console.log(`Error in Tab (showEnd): ${error}`)
        }
    }

    /**
     * Закрывает панель
     * @param {HTMLELement} tab
     * @param {HTMLELement} content
     */
    hide(tab, content) {
        try {
            content.setAttribute('hiding', '')
            tab.removeAttribute('active')

            this._setHeight(0, content)

            setTimeout(() => {
                this._hideEnd(tab, content)
            }, this.state.duration);
        } catch (error) {
            console.log(`Error in Tab (hide): ${error}`)
        }
    }

    /**
     * Закрывает все панели
     * @param {HTMLELement} currentTab
     */
    hideAll(currentTab) {
        try {
            if (currentTab) {
                const needTabsHidden = Array.prototype.filter.call(this.$tabs, tab => tab !== currentTab)

                needTabsHidden.forEach(tab => {
                    const panel = tab.closest(this.state.panelClass)
                    const content = panel.querySelector(this.state.contentClass)

                    content.removeAttribute('showing')
                    content.removeAttribute('show', '')
                    content.removeAttribute('hiding')
                    tab.removeAttribute('active')

                    this._setHeight(0, content)
                });

                this.tab = currentTab
            } else {
                this.$tabs.forEach(tab => {
                    const panel = tab.closest(this.state.panelClass)
                    const content = panel.querySelector(this.state.contentClass)

                    content.removeAttribute('showing')
                    content.removeAttribute('show', '')
                    content.removeAttribute('hiding')
                    tab.removeAttribute('active')

                    this._setHeight(0, content)
                });

                this.tab = null
            }
        } catch (error) {
            console.log(`Error in Tab (hideAll): ${error}`)
        }
    }

    /**
     * Вызыается после закрытия
     * @param {HTMLELement} tab
     * @param {HTMLELement} content
     */
    _hideEnd(tab, content) {
        try {
            content.removeAttribute('show')
            content.removeAttribute('hiding')
            // this.$panels.removeAttribute('active')

            this.emit('hode', tab, content)
        } catch (error) {
            console.log(`Error in Tab (hideEnd): ${error}`)
        }
    }

    /**
     * Задает высоту с анимацией
     * @param {string} height высоту элемента - 0 || px
     */
    _setHeight(height, content) {
        try {
            content.style.setProperty('height', `${content.scrollHeight}px`)

            window.requestAnimationFrame(() => {
                content.style.setProperty('height', `${height}`)
            });
        } catch (error) {
            console.log(`Error in Tab (setHeight): ${error}`)
        }
    }

    /**
     * Устанавливает уникальный id для панели
     * @param {HTMLELement} element
     */
    _setID(element) {
        try {
            element.setAttribute('data-id', `${this.id++}`)
            return this.id
        } catch (error) {
            console.log(`Error in Tab (setID): ${error}`)
        }
    }

    /**
     * Устанавилвает состояние для текущей панели
     * @param {HTMLELement} tab
     * @param {boolean} state
     */
    _setShowTab(tab, state) {
        try {
            const needTab = this.isShowTabs.filter(param => param.tab === tab)[0]

            this.isShowTabs = this.isShowTabs.map(param => {
                if (param.tab === needTab.tab) {
                    param.isShow = state
                }

                return param
            })
        } catch (error) {
            console.log(`Error in Tab (setShowTab): ${error}`)
        }
    }

    onResize() {
        try {
            this.$tabs.forEach((tab, i) => {
                if (!tab.hasAttribute('active')) return

                const panel = tab.closest(this.state.panelClass)
                const content = panel.querySelector(this.state.contentClass)

                content.style.setProperty('height', `auto`)

                this._setHeight(tab, content)
            })
        } catch (error) {
            console.log(`Error in Tab (onResize): ${error}`)
        }
    }
}

export default Accordion