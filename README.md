[npm-url]: https://www.npmjs.com/package/jcore-ui
[npm-image]: https://img.shields.io/npm/v/jcore-ui?style=flat-square

[download-url]: https://www.npmjs.com/package/jcore-ui
[download-img]: https://img.shields.io/npm/dm/jcore-ui?style=flat-square

[license-image]: https://img.shields.io/npm/l/jcore-ui?style=flat-square
[license-url]: https://github.com/concore-dev/jcore-ui/blob/master/LICENSE

[logo-url]: https://
[logo-image]: svg

# jcore-ui [![NPM version][npm-image]][npm-url] [![NPM download][download-img]][download-url] [![GitHub license][license-image]][license-url]

Компоненты для создания интерфейса

#### [Документация](https://concore-dev.github.io/jcore-ui/)

## Установка

```js
npm i jcore-ui
```

## Использование

```js
import jcore from "jcore-ui"

const modal = new jcore.Modal({
    options: {
        mount: false
    },
    on: {
        mount: (ctx) => {
            // ...
        }
    }
})

modal.on('mount', (ctx) => {
    // ...
})

modal.mount()
```

```scss
@import 'node_modules/jcore-ui/lib/scss/index.scss';
```

## Список компонентов

#### Разметка

Название | Ссылка на документацию |
--- | --- |
grid | [grid-docs](https://concore-dev.github.io/jcore-ui/markup/grid/)
container | [container-docs](https://concore-dev.github.io/jcore-ui/markup/container/)
button | [button-docs](https://concore-dev.github.io/jcore-ui/markup/button/)
input | [input-docs](https://concore-dev.github.io/jcore-ui/markup/input/)
form | [form-docs](https://concore-dev.github.io/jcore-ui/markup/form/)
table | [table-docs](https://concore-dev.github.io/jcore-ui/markup/table/)

#### js компоненты

Название | Ссылка на документацию |
--- | --- |
Accordion | [Accordion-docs](https://concore-dev.github.io/jcore-ui/components/accordion/)
Collapse | [Collapse-docs](https://concore-dev.github.io/jcore-ui/components/collapse/)
Dropdown | [Dropdown-docs](https://concore-dev.github.io/jcore-ui/components/dropdown/)
Modal | [Modal-docs](https://concore-dev.github.io/jcore-ui/components/modal/)
Progress | [Progress-docs](https://concore-dev.github.io/jcore-ui/components/progress/)
Select | [Select-docs](https://concore-dev.github.io/jcore-ui/components/select/)
Tab | [Tab-docs](https://concore-dev.github.io/jcore-ui/components/tab/)
Tooltip | [Tooltip-docs](https://concore-dev.github.io/jcore-ui/components/tooltip/)

#### html компоненты

Название | Ссылка на документацию |
--- | --- |
checkbox | [checkbox-docs](https://concore-dev.github.io/jcore-ui/components/checkbox/)
radio-button | [radio-button-docs](https://concore-dev.github.io/jcore-ui/components/radio/)
spinner | [spinner-docs](https://concore-dev.github.io/jcore-ui/components/spinner/)
toggle | [toggle-docs](https://concore-dev.github.io/jcore-ui/components/toggle/)
burger-button | [burger-button-docs](https://concore-dev.github.io/jcore-ui/components/burger/)

#### js утилиты

Название | Ссылка на документацию |
--- | --- |
EventEmitter | [EventEmitter-docs](https://concore-dev.github.io/jcore-ui/utils/EventEmitter/)
createTemplate | [createTemplate-docs](https://concore-dev.github.io/jcore-ui/utils/createTemplate/)
dataHref | [dataHref-docs](https://concore-dev.github.io/jcore-ui/utils/dataHref/)
dataScroll | [dataScroll-docs](https://concore-dev.github.io/jcore-ui/utils/dataScroll/)
waitFor | [waitFor-docs](https://concore-dev.github.io/jcore-ui/utils/waitFor/)
