import Tooltip from "../../lib/components/Tooltip";
import Dropdown from '../../lib/components/Dropdown';
import Tab from "../../lib/components/Tab";
import Accordion from "../../lib/components/Accordion";


window.Tooltip = Tooltip;
window.Dropdown = Dropdown;
window.Tab = Tab;


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
        multiple: true
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


export {}