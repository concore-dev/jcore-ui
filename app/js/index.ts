import Tooltip from "../../lib/components/Tooltip";
import Dropdown from '../../lib/components/Dropdown';
import Tab from "../../lib/components/Tab";
import Accordion from "../../lib/components/Accordion";
import Collapse from "../../lib/components/Collapse";
import Progress from "../../lib/components/Progress";
import Modal from "../../lib/components/Modal";
import Select from "../../lib/components/Select";
import dataHref from "../../lib/utils/dataHref";
import 'prismjs';
import dataScroll from "../../lib/utils/dataScroll";
import { $, JDom } from "../../lib/core/JDom";

// window.Tooltip = Tooltip;
window.Dropdown = Dropdown;
// window.Tab = Tab;
window.Accordion = Accordion;
window.Collapse = Collapse;
// window.Progress = Progress;
window.Modal = Modal;
// window.Select = Select;

// declare global {
//     interface JDom {
//         create(): any;
//     }
// }

try {
    const $menu = document.querySelector('.menu');
    const $menuToggle = document.querySelector('.menu-toggle');

    $menuToggle.addEventListener('click', () => {
        document.body.toggleAttribute('data-menu')
        $menu.toggleAttribute('data-active')
        $menuToggle.toggleAttribute('data-active')
    })

    dataHref()
    dataScroll()

    window.Accordions = new Accordion()
    // window.Tooltips = new Tooltip();
    window.Dropdowns = new Dropdown();
    // window.Tabs = new Tab()
    window.Collapses = new Collapse()
    // window.Progresses = new Progress()
    window.Modals = new Modal()
    // window.Selects = new Select()

} catch (e) {
    console.log(e);
}

export {}