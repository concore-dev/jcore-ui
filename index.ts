/*!
 * Jcore-ui v1.0.1
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
import dataHref from './lib/utils/dataHref';
import dataScroll from './lib/utils/dataScroll';
import event from './lib/utils/event';
import EventEmitter from './lib/utils/EventEmitter';
import waitFor from './lib/utils/waitFor';

export = {
    Accordion,
    Collapse,
    Dropdown,
    Modal,
    Progress,
    Select,
    Tab,
    Tooltip,
    Component,
    createElement,
    event,
    EventEmitter,
    dataScroll,
    dataHref,
    waitFor
}