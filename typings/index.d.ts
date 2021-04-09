declare var config: any;

interface Window {
    Tooltip: typeof import("../lib/components/Tooltip").default;
    Tooltips: import("../lib/components/Tooltip").default
    Dropdown:  typeof import("../lib/components/Dropdown").default;
    Dropdowns: import("../lib/components/Dropdown").default;
    Tab: typeof import("../lib/components/Tab").default;
    Tabs: import("../lib/components/Tab").default;
    Modal: typeof import("../lib/components/Modal").default;
    Modals: import("../lib/components/Modal").default;
    Accordion: typeof import("../lib/components/Accordion").default;
    Accordions: import("../lib/components/Accordion").default;
    Collapse: typeof import("../lib/components/Collapse").default;
    Collapses: import("../lib/components/Collapse").default;
    Modal: typeof import("../lib/components/Modal").default;
    Modals: import("../lib/components/Modal").default;
    Progress: typeof import("../lib/components/Progress").default;
    Progresses: import("../lib/components/Progress").default;
    Select: typeof import("../lib/components/Select").default;
    Selects: import("../lib/components/Select").default;
}


interface Event {
}

interface EventTarget {
    closest: (...args: any) => any
    dataset: any
}

// declare const filterController: TEventEmitter;