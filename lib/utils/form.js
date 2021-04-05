import utils from '@utils'

const form = {
    /**
     * Возвращает массив с данными полей формы
     * @param {HTMLElement} form
     * @returns {object} Возвращает массив данных полей [...{name, input, container, value}]
     */
    getFields(form) {
        const inputsForm = form.querySelectorAll('[am-input]');
        let inputs = [];

        inputsForm.forEach(input => {
            inputs.push({
                container: input,
                input: input.querySelector('[name]'),
                name: input.querySelector('[name]').getAttribute('name'),
                value: input.querySelector('[name]').value
            })
        });

        return inputs
    },

    /**
     * Возвращает обьект с данными поля формы
     * @param {HTMLElement} element
     * @returns {object} Возвращает данные поля {name, input, container, value}
     */
    getField(element) {
        return {
            container: element,
            input: element.querySelector('[name]'),
            name: element.querySelector('[name]').getAttribute('name'),
            value: element.querySelector('[name]').value
        }
    },

    /**
     * Обработчик полей формы, валидирует поля формы
     * @param {HTMLElement} element Элемент валидации
     * @param {object} options Параметры, на которые нужно проверять поле {empty, text, number, phone, email}
     */
    handlerChange(element, options = {}) {
        if ('text' in options && options.text) {
            element.value = utils.mask.string(this.getField(element).input).value
        }

        if ('phone' in options && options.phone) {
            utils.mask.phone(this.getField(element).input)
        }

        this.getField(element).input.addEventListener('keydown', () => {
            this.validate(this.getField(element), options)
        })
        this.getField(element).input.addEventListener('input', () => {
            this.validate(this.getField(element), options)
        })
    },

    /**
     * Валидация поля формы
     * @param {object} element - обьект с данными поля {name, input, container, value}
     * @param {object} options - параметры валидации {empty, text, number, phone, email}
     * @param {object} result - обьект, с результатами валидации {name: true|false}     *
     * @returns {object} возвращает результат валидаци {name: true|false}
     */
    validate(element, options = {}, result = {}) {
        // сбрасываем состояния
        result[element.name] = false

        if ('empty' in options && options.empty) {
            element.container.removeAttributes('error', 'accept')
            if (element.value.length < 1) {
                element.container.setAttribute('error', '');
                result[element.name] = true;
            } else {
                result[element.name] = false;
                element.container.setAttribute('accept', '');
            }
        }

        if ('phone' in options && options.phone && element.value.length == 17 && element.value.indexOf('_') < 0) {
            element.container.removeAttributes('error', 'accept')
            element.container.setAttribute('accept', '');
            result[element.name] = false;
        } else if ('phone' in options && options.phone) {
            element.container.removeAttributes('error', 'accept')
            element.container.setAttribute('error', '');
            result[element.name] = true;
        }

        if ('email' in options && options.email && element.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            element.container.removeAttributes('error', 'accept')
            element.container.setAttribute('accept', '');
            result[element.name] = false;
        } else if ('email' in options && options.email) {
            element.container.removeAttributes('error', 'accept')
            element.container.setAttribute('error', '');
            result[element.name] = true;
        }

        return result;
    },

    /**
     * Возвращает true если есть ошибки при валидации
     * @param {object} error Результат валидации {name: true|false}
     */
    checkError(error) {
        for (let key in error) {
            if (error[key]) {
                return true
            }
        }
        return false
    },

    /**
     * Очищает значение
     * @param {HTMLElement} element 
     */
    clear(element) {
        element.value = ''
    }
}

export default form