/*!
 * Jcore-ui v1.0.4
 * Native javascript ui components
 * https://github.com/concore-dev/jcore-ui
 *
 * Copyright 2021 Eryomin Nickolay
 * Published under MIT License
 *
 */
import Accordion from './lib/components/Accordion';
import Collapse from './lib/components/Collapse';
import Dropdown from './lib/components/Dropdown';
import Modal from './lib/components/Modal';
import Progress from './lib/components/Progress';
import Select from './lib/components/Select';
import Tab from './lib/components/Tab';
import Tooltip from './lib/components/Tooltip';
import Component from './lib/core/Component';
import createElement from './lib/utils/createElement';
import EventEmitter from './lib/utils/EventEmitter';
import waitFor from './lib/utils/waitFor';
import { JDom, $ } from './lib/core/JDom';
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
    createElement: typeof createElement;
    event: {
        transitionEnd(): any;
        animationEnd(): any;
    };
    EventEmitter: typeof EventEmitter;
    dataScroll: (polyfill?: () => any) => void;
    dataHref: () => void;
    waitFor: typeof waitFor;
    $: typeof $;
    JDom: typeof JDom;
};
export = _default;
//# sourceMappingURL=index.d.ts.map