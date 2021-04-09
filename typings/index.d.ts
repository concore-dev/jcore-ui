declare var config: any;

interface Window {
    Tooltip: typeof import("../lib/components/Tooltip").default;
    Tooltips: import("../lib/components/Tooltip").default
    Dropdown:  typeof import("../lib/components/Dropdown").default;
    Dropdowns: import("../lib/components/Dropdown").default
    Tab: typeof import("../lib/components/Tab").default;
    Tabs: import("../lib/components/Tab").default;
}


interface Event {
}

interface EventTarget {
    closest: (...args: any) => any
    dataset: any
}

// declare const filterController: TEventEmitter;