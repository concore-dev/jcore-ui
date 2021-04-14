"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tooltip_1 = __importDefault(require("../../lib/components/Tooltip"));
const Dropdown_1 = __importDefault(require("../../lib/components/Dropdown"));
const Tab_1 = __importDefault(require("../../lib/components/Tab"));
const Accordion_1 = __importDefault(require("../../lib/components/Accordion"));
const Collapse_1 = __importDefault(require("../../lib/components/Collapse"));
const Progress_1 = __importDefault(require("../../lib/components/Progress"));
const Modal_1 = __importDefault(require("../../lib/components/Modal"));
const Select_1 = __importDefault(require("../../lib/components/Select"));
const dataHref_1 = __importDefault(require("../../lib/utils/dataHref"));
require("prismjs");
const dataScroll_1 = __importDefault(require("../../lib/utils/dataScroll"));
window.Tooltip = Tooltip_1.default;
window.Dropdown = Dropdown_1.default;
window.Tab = Tab_1.default;
window.Accordion = Accordion_1.default;
window.Collapse = Collapse_1.default;
window.Progress = Progress_1.default;
window.Modal = Modal_1.default;
window.Select = Select_1.default;
try {
    const $menu = document.querySelector('.menu');
    const $menuToggle = document.querySelector('.menu-toggle');
    $menuToggle.addEventListener('click', () => {
        document.body.toggleAttribute('data-menu');
        $menu.toggleAttribute('data-active');
        $menuToggle.toggleAttribute('data-active');
    });
    dataHref_1.default();
    dataScroll_1.default();
    window.Accordions = new Accordion_1.default();
    window.Tooltips = new Tooltip_1.default();
    window.Dropdowns = new Dropdown_1.default();
    window.Tabs = new Tab_1.default();
    window.Collapses = new Collapse_1.default();
    window.Progresses = new Progress_1.default();
    window.Modals = new Modal_1.default();
    window.Selects = new Select_1.default();
}
catch (e) {
    console.log(e);
}
//# sourceMappingURL=index.js.map