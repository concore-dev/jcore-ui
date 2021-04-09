import Tooltip from "../../lib/components/Tooltip";
import Dropdown from '../../lib/components/Dropdown';


window.Tooltip = Tooltip;
window.Dropdown = Dropdown;


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


const dropdown = window.Dropdowns.getByName(window.Dropdowns.components, 'dropdown-1');
dropdown.emitter.on('mount', (ctx) => {
    console.log('mount', ctx);
})
dropdown.emitter.on('render', (ctx) => {
    console.log('render', ctx);
})
dropdown.emitter.on('destroy', (ctx) => {
    console.log('destroy', ctx);
})
dropdown.emitter.on('unmount', (ctx) => {
    console.log('unmount', ctx);
})
dropdown.mount()


export {}