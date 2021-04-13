import Accordion from './lib/components/Accordion';
import Collapse from './lib/components/Collapse';
import Dropdown from './lib/components/Dropdown';
import Modal from './lib/components/Modal';
import Progress from './lib/components/Progress';
import Select from './lib/components/Select';
import Tab from './lib/components/Tab';
import Tooltip from './lib/components/Tooltip';
import Component from './lib/core/Component';
import createTemplate from './lib/utils/createTemplate';
import dataHref from './lib/utils/dataHref';
import dataScroll from './lib/utils/dataScroll';
import event from './lib/utils/event';
import EventEmitter from './lib/utils/EventEmitter';
import waitFor from './lib/utils/waitFor';
export { Accordion, Collapse, Dropdown, Modal, Progress, Select, Tab, Tooltip, Component, createTemplate, event, EventEmitter, dataScroll, dataHref, waitFor };
declare const _default: {
    Accordion: typeof Accordion;
    Collapse: typeof Collapse;
    Dropdown: typeof Dropdown;
    Modal: typeof Modal;
    Progress: typeof Progress;
    Select: typeof Select;
    Tab: typeof Tab;
    Tooltip: typeof Tooltip;
    Component: typeof Component;
    createTemplate: (content: string) => HTMLElement;
    event: {
        transitionEnd(): any;
        animationEnd(): any;
    };
    EventEmitter: typeof EventEmitter;
    dataScroll: (polyfill?: () => any) => void;
    dataHref: () => void;
    waitFor: typeof waitFor;
};
export default _default;
//# sourceMappingURL=index.d.ts.map