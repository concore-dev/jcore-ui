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


window.Dropdowns.getByName(window.Dropdowns.components, 'dropdown-1').emitter.on('render', (ctx) => {
    console.log(ctx);

})


export {}