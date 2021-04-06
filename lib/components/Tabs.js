import utils from '@utils'
import EventEmitter from '@utils/EventEmitter'

class Tabs extends EventEmitter {
    constructor(element, props) {
        super()

        this.state = {
            class: '[am-tabs]',
            tabClass: '[am-tab]',
            contentClass: '[am-tab-content]',
            active: true,
            init: false
        }

        this.state = utils.object.extend(this.state, props)

        this.$element = document.querySelector(this.state.class)

        if (typeof element === 'object') {
            this.$element = element
        } else if (typeof element === 'string') {
            this.$element = document.querySelector(element)
        }

        this.$tabs = this.$element.querySelectorAll(this.state.tabClass)
        this.$contents = this.$element.querySelectorAll(this.state.contentClass)

        if (this.state.init) {
            this.init()
        }
    }

    /**
     * Инициализация Tabs
     */
    init() {
        try {
            // Навешиваем обработчик нажатий на вкладку
            this.$tabs.forEach(element => element.addEventListener('click', () => this._change(element)))

            // Переключаем на 1 контент
            if (this.state.active) {
                this._toggle(this.$tabs[0], Array.prototype.filter.call(this.$contents, item => item.dataset.content === this.$tabs[0].dataset.tab)[0])
            }

            this.emit('init', {
                state: this.state,
                element: this.$element,
                tabs: this.$tabs,
                contents: this.$contents
            })
        } catch (error) {
            console.log(`Error in Tab (init): ${error}`)
        }
    }

    /**
     * Изменяет контент Tabs
     * @param {HTMLELement} tab элемент вкладки
     */
    _change(tab) {
        try {
            const content = Array.prototype.filter.call(this.$contents, item => item.dataset.content === tab.dataset.tab)[0]

            if (!tab.hasAttribute('active') || !content.hasAttribute('active')) {
                this._toggle(tab, content)
                this.emit('change', tab, content)
            }
        } catch (error) {
            console.log(`Error in Tab (change): ${error}`)
        }
    }

    /**
     * Переключает Tabs
     * @param {HTMLElement} tab элемент вкладки
     * @param {HTMLElement} content элемент контента
     */
    _toggle(tab, content) {
        try {
            this.$tabs.forEach(item => item.removeAttribute('active'))
            this.$contents.forEach(item => item.removeAttribute('active'))

            tab.setAttribute('active', '')
            content.setAttribute('active', '')
        } catch (error) {
            console.log(`Error in Tab (toggle): ${error}`)
        }
    }
}

export default Tabs