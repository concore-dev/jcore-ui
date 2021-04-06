import utils from '@utils'

let init = false;

class Dropdown {
    constructor(props){
        this.props = props

        this.state = {
            dropdown: null,
            dropdownHeader: null,
            dropdownContent: null,
            dropdownWrapper: null,

            dropdownTags: {},
            headerTags: {},
            contentTags: {},
            wrapperTags: {},
            arrowTags: {},

            direction: 'bottom',
            children: [],
            childrenHeader: [],

            init: false,
            render: false,
            build: false,

            onRender: () =>{},
            onDestroy: () =>{}
        }

        this.state = utils.object.extend(this.state, this.props)

        if (this.state.dropdown) {
            this.initDropdown()
        }
    }

    /**
     * Инициализация Dropdown
     */
    init() {
        if (init) { return }
        document.addEventListener('click', (e) => {
            if (!e.target.closest('[am-dropdown]')) {
                e.stopPropagation();
                this.state.onDestroy();
                this.destroy(true);
            }
        });

        init = true
        this.state.init = true
    }

    initDropdown() {
        if (this.state.dropdown) {
            const arrow = this.state.dropdown.querySelector('[am-dropdown-arrow]')
            const wrapper = this.state.dropdown.querySelector('[am-dropdown-wrapper]')
            const content = this.state.dropdown.querySelector('[am-dropdown-content]')
            const header = this.state.dropdown.querySelector('[am-dropdown-header')

            if (arrow) {
                arrow.setAttributes({...this.state.arrowTags})
            }

            if (wrapper) {
                wrapper.setAttributes({...this.state.wrapperTags})
            }

            if (content) {
                content.setAttributes({...this.state.contentTags})
            }

            if (header) {
                header.setAttributes({...this.state.headerTags})
            }

            this.state.dropdown.setAttribute('build', '')

            this.state.dropdownHeader = header
            this.state.dropdownContent = content
            this.state.dropdownWrapper = wrapper
            this.init()

            this.state.dropdownHeader.addEventListener('click', this.render.bind(this))
            this.state.dropdownWrapper.addEventListener('click', this.render.bind(this))
        }
    }

    /**
     * Создает Dropdown
     */
    build() {
        const arrow = utils.element.create('div', {'am-dropdown-arrow': '', ...this.state.arrowTags})
        const wrapper = utils.element.create('div', {'am-dropdown-wrapper': '', ...this.state.wrapperTags}, [arrow, ...this.state.children])
        const content = utils.element.create('div', {'am-dropdown-content': '', ...this.state.contentTags}, [wrapper])
        const header = utils.element.create('div', {'am-dropdown-header': '', ...this.state.headerTags}, this.state.childrenHeader)
        const dropdown = utils.element.create('div', {'am-dropdown': '', 'build': '', ...this.state.dropdownTags}, [
            header,
            content
        ])

        this.state.dropdown = dropdown
        this.state.dropdownHeader = header
        this.state.dropdownContent = content
        this.state.dropdownWrapper = wrapper
        this.state.build = true
        this.init()

        this.state.dropdownHeader.addEventListener('click', this.render.bind(this))
        this.state.dropdownWrapper.addEventListener('click', this.render.bind(this))

        return this.state.dropdown
    }

    /**
     * Открывает Dropdown
     */
    render() {
        if (this.state.dropdown.hasAttribute('active')) {
            this.state.dropdown.removeAttribute('active')
            this.state.render = false
            this.state.onDestroy()
        } else {
            this.state.dropdown.setAttribute('active', '')
            this.state.render = true
            this.state.onRender()
            this.setDirection()
        }
        this.destroy();
    }

    /**
     * Закрывает Dropdown
     * @param {Boolean} all true, если необходимо закрыть все Dropdown
     */
    destroy(all = false) {
        const dropdowns = document.querySelectorAll('[am-dropdown]');

        dropdowns.forEach(item => {
            if (all) {
                item.removeAttribute('active');
            } else if (item !== this.state.dropdown) {
                item.removeAttribute('active');
            }
        })
    }

    /**
     * Устанавливает направление Dropdown
     */
    setDirection() {
        let coord = utils.element.coord(this.state.dropdownWrapper);

        if (this.state.dropdownContent.hasAttribute('direction-old')) {
            this.state.dropdownContent.setAttribute('direction', this.state.dropdownContent.getAttribute('direction-old'))
            coord = utils.element.coord(this.state.dropdownWrapper);
        }

        if (this.state.dropdownContent.getAttribute('direction') === 'top') {
            if (coord.top <= 5) {
                this.state.dropdownContent.setAttribute('direction', 'bottom')
                this.state.dropdownContent.setAttribute('direction-old', 'top')
            }
        } else if (this.state.dropdownContent.getAttribute('direction') === 'bottom' || !this.state.dropdownContent.hasAttribute('direction')) {
            if ((coord.clientHeight - coord.bottom) <= 5 && (coord.top - coord.height) > 10) {
                this.state.dropdownContent.setAttribute('direction', 'top')
                this.state.dropdownContent.setAttribute('direction-old', 'bottom')
            }
        }
    }

    /**
     * Инициализация шаблонных Dropdown 
     */
    static bubbleInit() {
        document.addEventListener('click', (e) => {
            const dropdowns = document.querySelectorAll('[am-dropdown]')

            if (e.target.closest('[am-dropdown]') && e.target.closest('[am-dropdown]').hasAttribute('build')) {
                return
            }

            if (e.target.hasAttribute('am-dropdown-header') || e.target.closest('[am-dropdown-header]') || e.target.hasAttribute('am-dropdown-content')) {
                const dropdown = e.target.closest('[am-dropdown]');
                const dropdownContent = dropdown.querySelector('[am-dropdown-content]');
                const dropdownWrapper= dropdown.querySelector('[am-dropdown-wrapper]');
                let coord = utils.element.coord(dropdownWrapper);

                if (!dropdown.hasAttribute('active')) {
                    if (dropdownContent.hasAttribute('direction-old')) {
                        dropdownContent.setAttribute('direction', dropdownContent.getAttribute('direction-old'))
                        coord = utils.element.coord(dropdownWrapper);
                    }

                    if (dropdownContent.getAttribute('direction') === 'top') {
                        if (coord.top <= 5) {
                            dropdownContent.setAttribute('direction', 'bottom')
                            dropdownContent.setAttribute('direction-old', 'top')
                        }
                    } else if (dropdownContent.getAttribute('direction') === 'bottom' || !dropdownContent.hasAttribute('direction')) {
                        if ((coord.clientHeight - coord.bottom) <= 5 && (coord.top - coord.height) > 10) {
                            dropdownContent.setAttribute('direction', 'top')
                            dropdownContent.setAttribute('direction-old', 'bottom')
                        }
                    }
                }

                dropdowns.forEach(dropdown1 => {
                    if (dropdown1 !== dropdown) {
                        dropdown1.removeAttribute('active');
                    }
                });

                if (e.target.closest('[am-dropdown]').hasAttribute('active')) {
                    e.target.closest('[am-dropdown]').removeAttribute('active');
                } else {
                    e.target.closest('[am-dropdown]').setAttribute('active', '');
                }
            } else if (e.target.closest('[am-dropdown-wrapper]')) {
                dropdowns.forEach(dropdown => {
                    dropdown.removeAttribute('active');
                });
            } else {
                dropdowns.forEach(dropdown => {
                    dropdown.removeAttribute('active');
                });
            }
        });
    }
}

export default Dropdown