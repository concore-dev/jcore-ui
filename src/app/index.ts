import Tooltip from "../../lib/components/Tooltip";
import Dropdown from '../../lib/components/Dropdown';
import Tab from "../../lib/components/Tab";
import Accordion from "../../lib/components/Accordion";
import Collapse from "../../lib/components/Collapse";
import Progress from "../../lib/components/Progress";


window.Tooltip = Tooltip;
window.Dropdown = Dropdown;
window.Tab = Tab;
window.Accordion = Accordion;
window.Collapse = Collapse;
window.Progress = Progress;


window.Tooltips = new Tooltip({
    on: {
        // mount: (ctx) => {
        //     console.log('mount', ctx);
        // },
        // destroy: (ctx) => {
        //     console.log('destroy', ctx);
        // },
        // render: (ctx) => {
        //     console.log('render', ctx);
        // },
        // unmount: (ctx) => {
        //     console.log('unmount', ctx);
        // }
    }
});
window.Dropdowns = new Dropdown({
    options: {
        mount: false
    }
    // on: {
    //     mount: (ctx) => {
    //         console.log('mount', ctx);
    //     },
    //     destroy: (ctx) => {
    //         console.log('destroy', ctx);
    //     },
    //     render: (ctx) => {
    //         console.log('render', ctx);
    //     },
    //     unmount: (ctx) => {
    //         console.log('unmount', ctx);
    //     }
    // }
});
window.Tabs = new Tab({
    options: {
        mount: true,
        active: true
    },
    // on: {
    //     mount: (ctx) => {
    //         console.log('on mount', ctx);
    //     },
    //     toggle: (ctx) => {
    //         console.log('on toggle', ctx);
    //     },
    //     unmount: (ctx) => {
    //         console.log('on unmount', ctx);
    //     }
    // }
})
window.Accordions = new Accordion({
    options: {
        mount: true,
        multiple: false
        // active: true
    },
    // on: {
    //     mount: (ctx) => {
    //         console.log('on mount', ctx);
    //     },
    //     toggle: (ctx) => {
    //         console.log('on toggle', ctx);
    //     },
    //     unmount: (ctx) => {
    //         console.log('on unmount', ctx);
    //     }
    // }
})
window.Collapses = new Collapse({
    options: {
        mount: false,
        // active: true
    },
    on: {
        mount: (ctx) => {
            console.log('on mount', ctx);
        },
        toggle: (ctx) => {
            console.log('on toggle', ctx);
        },
        unmount: (ctx) => {
            console.log('on unmount', ctx);
        }
    }
})
window.Progresses = new Progress({
    options: {
        mount: false,
        // active: true
    },
    on: {
        mount: (ctx) => {
            console.log('on mount', ctx);
        },
        change: (ctx) => {
            console.log('on change', ctx);
        },
        unmount: (ctx) => {
            console.log('on unmount', ctx);
        }
    }
})


// const dropdown = window.Dropdowns.getByName(window.Dropdowns.components, 'dropdown-1');
// dropdown.emitter.on('mount', (ctx) => {
//     console.log('mount', ctx);
// })
// dropdown.emitter.on('render', (ctx) => {
//     console.log('render', ctx);
// })
// dropdown.emitter.on('destroy', (ctx) => {
//     console.log('destroy', ctx);
// })
// dropdown.emitter.on('unmount', (ctx) => {
//     console.log('unmount', ctx);
// })
// dropdown.mount()

// const tabs = window.Tabs.getByName(window.Tabs.components, 'tabs-1');
// tabs.emitter.on('mount', (ctx) => {
//     console.log('emitter mount', ctx);
// })
// tabs.emitter.on('toggle', (ctx) => {
//     console.log('emitter toggle', ctx);
// })
// tabs.emitter.on('unmount', (ctx) => {
//     console.log('emitter unmount', ctx);
// })
// tabs.mount()

// const acc = window.Accordions.getByName(window.Accordions.components, 'acc-1');

// acc.emitter.on('mount', (ctx: Accordion) => {
//     console.log('emitter mount', ctx);
// })
// acc.emitter.on('toggle', (ctx: Accordion) => {
//     console.log('emitter toggle', ctx);
// })
// acc.emitter.on('unmount', (ctx: Accordion) => {
//     console.log('emitter unmount', ctx);
// })
// acc.mount()

// const collapse = window.Collapses.getByName(window.Collapses.components, 'col-1');

// collapse.emitter.on('mount', (ctx: Accordion) => {
//     console.log('emitter mount', ctx);
// })
// collapse.emitter.on('toggle', (ctx: Accordion) => {
//     console.log('emitter toggle', ctx);
// })
// collapse.emitter.on('unmount', (ctx: Accordion) => {
//     console.log('emitter unmount', ctx);
// })
// collapse.mount()

const progress = window.Progresses.getByName(window.Progresses.components, 'prog-50');

progress.emitter.on('mount', (ctx) => {
    console.log('emitter mount', ctx);
})
progress.emitter.on('change', (ctx) => {
    console.log('emitter toggle', ctx);
})
progress.emitter.on('unmount', (ctx) => {
    console.log('emitter unmount', ctx);
})
progress.mount()


export {}