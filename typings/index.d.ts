declare var config: any;

interface Window {
    Tooltip: typeof import("../lib/components/Tooltip").default;
    Tooltips: import("../lib/components/Tooltip").default
    Dropdown:  typeof import("../lib/components/Dropdown").default;
    Dropdowns: import("../lib/components/Dropdown").default
}

interface EventTarget {
    closest: (...args: any) => any
}

// declare const filterController: TEventEmitter;