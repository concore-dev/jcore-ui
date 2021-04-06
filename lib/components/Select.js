import element from '@utils/element'
import object from '@utils/object'
import EventEmitter from '@utils/EventEmitter'

let init = false;
// let bubbleInit = false;

class Select extends EventEmitter{
    constructor(element, props) {
        super()

        this.props = props

        this.state = {
            value: {},
            options: [
                // { value: '', label: 'Нет значений'}
            ],

            name: '',
            placeholder: '',
            placeholderOption: '',
            placeholderSearch: 'Значений не найдено',
            selectTags: {},
            valueTags: {},
            optionsTags: {},
            optionTags: {},

            render: false,
            build: false,

            reverse: false,
            search: false,
            option: true,

            control: this.control.bind(this),
            controlCounter: -1,
        }


        if (Array.isArray(element)) {
            let array;

            if (element.length) {
                array = element.map(sel => new Select(sel, props));
            }

            return array;
        }

        this.$select = null;
        this.$input = null;
        this.$value = null;
        this.$options = null;
        this.$option = null;

        if (typeof element === 'object') {
            this.$select = element
        } else if (typeof element === 'string') {
            this.$select = document.querySelector(element)
        } else {
            throw new Error('Select: Неправльный тип element')
        }

        this.state = object.extend(this.state, this.props)

        if (this.$select) {
            this.init()
        }
    }

    initDocument() {
        if (init) { return }
        document.addEventListener('click', (e) => {
            if (!e.target.closest('[am-select]')) {
                e.stopPropagation();
                this.destroy(true);
                
                // Сброс поиска в value
                document.querySelectorAll('[am-select-value]').forEach(item => {
                    if (item.hasAttribute('data-value')) {
                        item.innerText = item.dataset.value
                    }
                })
            }
        });

        init = true
    }

    /**
     * Инициализация Select
     */
    init() { 
        this.$input = this.$select.querySelector('[am-select-input]');
        this.$value = this.$select.querySelector('[am-select-value]');
        this.$options = this.$select.querySelector('[am-select-options]');
        this.$select.setAttribute('init', 'true')

        let options = this.$options.querySelectorAll('[am-select-option]')

        // Если есть передали options, добавялем в Select
        if (this.state.options.length) {
            this.state.options.map(option => {
                this.$options.appendChild(element.createTemplate(`
                    <div am-select-option="${option.value}" tab-index="0">${option.label}</div>
                `))
            })
        }

        // Если нет опций в стейте и в шаблоне, то добавляем placeholderOption
        if (!this.state.options.length && !options.length) {
           if (this.state.placeholderOption) {
                this.$options.appendChild(element.createTemplate(`
                    <div am-select-option="default" tab-index="0" default>${this.state.placeholderOption}</div>
                `))
           } else {
            this.$options.appendChild(element.createTemplate(`
                <div am-select-option="default" tab-index="0" default>Нет значений</div>
            `))
           }
        }

        // Если есть option в шаблоне, добавляем их в стейт
        if (options.length) {
            options.forEach(item => {
                this.state.options.push({value: item.getAttribute('am-select-option'), label: item.textContent})
                item.setAttribute('tabindex', 0)
            })
        }        

        this.$option = this.$options.querySelectorAll('[am-select-option]')

        // Навешиваем обработчики
        this.$option.forEach(option => {            
            option.addEventListener('click', (e)=> {
                e.preventDefault();

                if (!option.hasAttribute('selected') && !option.hasAttribute('default')) {
                    this.change(option)
                }
            })
        })

        // Если есть placeholder, подставляем в value, иначе первое значение
        if (this.state.option) {
            if (this.state.placeholder) {
                this.change(element.createTemplate(`
                    <div am-select-option="default" tab-index="0" default>${this.state.placeholder}</div>
                `), false)
            } else {
                if (this.$option.length) {
                    this.change(this.$option[0], false)
                } else {
                    this.change(element.createTemplate(`
                        <div am-select-option="default" tab-index="0" default>Нет значений</div>
                    `), false)
                }
            }
        }

        this.$value.addEventListener('click', (e)=> {
            this.render()
            if (this.state.search) {
                this.$value.focus()
            }
        })

        if (this.state.search) {
            this.$value.setAttribute('data-value', this.$value.innerText)
            
            this.searchInit()
        }

        this.initDocument()
    }

    /**
     * Открывает Select
     */
    render() {
        // const coord = utils.element.coord(this.state.divOptions);
        // this.state.divOptions.removeAttribute('reverse')
        // if ((coord.clientHeight - coord.bottom) <= 5 && (coord.top - coord.height) > 50 && !this.state.divSelect.hasAttribute('active')) {
        //     this.state.divOptions.setAttribute('reverse', '')
        // }

        if (this.$select.hasAttribute('active')) {
            this.$select.removeAttribute('active');
            this.destroy();
        } else {
            this.emit('render', this.$select)
            this.destroy(true);
            this.state.render = true
            this.controlInit(true);
            this.$select.setAttribute('active', '');            
        }
    }

    /**
     * Закрывает Select
     * @param {HTMLElement} currentSelect текущей Select
     * @param {Boolean} notEmit true, destroy не вызовится
     */
    destroy(notEmit = false) {
        const selects = document.querySelectorAll('[am-select]');

        selects.forEach((select) => {
            select.removeAttribute('active');
        })
        
        if (!notEmit) {
            this.emit('destroy', this.$select) 
        }
        this.controlInit();
    }

    /**
     * Изменяет option
     * @param {Object} option параметры option 
     */
    change(option, emit = true) {
        this.$input.value = option.getAttribute('am-select-option');
        this.$value.setAttribute('am-select-value', option.getAttribute('am-select-option'))
        this.$value.innerText = option.innerText;
        const selected = this.$options.querySelector('[am-select-option][selected]');

        if (selected) {
            selected.removeAttribute('selected');
        }
        option.setAttribute('selected', '');

        this.state.value = this.state.options.filter(item => {
            // eslint-disable-next-line eqeqeq
            return item.value == option.getAttribute('am-select-option');
        })
        
        // Если такого значение в стейте options нет, значит вставляем значение из элемента на который сработал обработчик
        if (this.state.value.length) {
            this.$value.setAttribute('data-value', this.state.value[0].label)
            this.state.value = {value: this.state.value[0].value, label: this.state.value[0].label}
        } else {
            this.state.value = {value: option.getAttribute('am-select-option'), label: option.innerText}
            this.$value.setAttribute('data-value', option.innerText)
        }        
        
        if (emit) {
            this.emit('change', this.state.value)
        }
        this.destroy();
    }

    /**
     * Переключение стрелочками
     * @param {Event} e 
     */
    control(e) {
        const options = this.$options.children;

        if(event.which == 38) {
            e.preventDefault();
            if (!options[this.state.controlCounter - 1]) {return}
            this.state.controlCounter -= 1;
            options[this.state.controlCounter].focus()
        } else if (event.which == 40) {
            e.preventDefault();
            if (!options[this.state.controlCounter + 1]) {
                return
            }
            this.state.controlCounter += 1
            options[this.state.controlCounter].focus()
        } else if(event.which == 13){
            options[this.state.controlCounter].click()
        }
    }

    /**
     * Инициализация контроля
     * @param {*} render true, добавляет обработчик, иначе удаляет
     */
    controlInit(render = false) {
        if (render) {
            document.addEventListener('keydown', this.state.control, false);
        } else {
            document.removeEventListener('keydown', this.state.control, false);
        }
    }

    searchInit() {     
        const searchHanlderClick = this._searchHanlderClick.bind(this)
        const searchHanlderInput = this._searchHanlderInput.bind(this)
        // const searchReset = this._searchReset.bind(this)

        this.$value.addEventListener('input', searchHanlderInput)
        // this.$value.addEventListener('blur', searchReset)
        this.$value.addEventListener('click', searchHanlderClick)
    }

    _searchHanlderClick() {
        this._searchReset()

        if (!this.$select.hasAttribute('active')) {
            this.$value.setAttribute('contenteditable', false)
            this.$value.innerText = this.$value.getAttribute('data-value')
        } else {
            this.$value.setAttribute('contenteditable', true)
            this.$value.innerHTML = '&nbsp'
            this.$value.focus()
        }  
    }

    _searchHanlderInput() {
        const searchText = this.$value.innerText.trim().toLowerCase()
        const optionEmpty = this.$options.querySelector('[am-select-option="empty"]')
        let countSearch = 0;


        this.$option.forEach(option => {
            const optionText = option.innerText.trim().toLowerCase(); 

            if (optionText.indexOf(searchText) === -1) {
                option.setAttribute('hidden', '')
            } else {
                countSearch += 1; 
                option.removeAttribute('hidden')          
            } 
        })

        if (optionEmpty) {
            optionEmpty.remove()
        }

        if (!countSearch) {
            this.$options.appendChild( element.createTemplate(`
                <div am-select-option="empty" tab-index="0" default>${this.state.placeholderSearch}</div>
            `))
        }
    }

    _searchReset() {
        const optionEmpty = this.$options.querySelector('[am-select-option="empty"]')
        this.$option.forEach(option => option.removeAttribute('hidden'))
        
        if (optionEmpty) {
            optionEmpty.remove()
        }
    }
}

export default Select