declare var config: any;

interface Window {
    Tooltip: typeof Tooltip;
    Tooltips: Tooltip
    Dropdown: typeof Dropdown;
    Dropdowns: Dropdown
}

interface EventTarget {
    closest: (...args: any) => any
}

// declare const filterController: TEventEmitter;