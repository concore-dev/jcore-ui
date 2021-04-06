



// import utils from '@utils'

// class Tooltip {
//     static bubbleInit() {
//         let active = false;

//         document.addEventListener('mouseover', (e) => {
//             const tooltips = document.querySelectorAll('[am-tooltip]')

//             if (e.target.closest('[am-tooltip]')) {
//                 const tooltip = e.target.closest('[am-tooltip]');
//                 const tooltipContent = tooltip.querySelector('[am-tooltip-content]');
//                 const tooltipWrapper= tooltip.querySelector('[am-tooltip-wrapper]');
//                 active = true;

//                 let coord = utils.element.coord(tooltipWrapper);

//                 if (!tooltip.hasAttribute('active')) {
//                     if (tooltipContent.hasAttribute('direction-old')) {
//                         tooltipContent.setAttribute('direction', tooltipContent.getAttribute('direction-old'))
//                         coord = utils.element.coord(tooltipWrapper);
//                     }

//                     if (tooltipContent.getAttribute('direction') === 'left') {

//                     } else if (tooltipContent.getAttribute('direction') === 'top') {
//                         if (coord.top <= 5) {
//                             tooltipContent.setAttribute('direction', 'bottom')
//                             tooltipContent.setAttribute('direction-old', 'top')
//                         }
//                     } else if (tooltipContent.getAttribute('direction') === 'right') {

//                     } else if (tooltipContent.getAttribute('direction') === 'bottom' || !tooltipContent.hasAttribute('direction')) {
//                         if ((coord.clientHeight - coord.bottom) <= 5 && (coord.top - coord.height) > 10) {
//                             tooltipContent.setAttribute('direction', 'top')
//                             tooltipContent.setAttribute('direction-old', 'bottom')
//                         }
//                     }
//                 }

//                 tooltips.forEach(tooltip1 => {
//                     if (tooltip1 !== tooltip) {
//                         tooltip1.removeAttribute('active');
//                     }
//                 });

//                 if (!tooltip.hasAttribute('active')) {
//                     tooltip.setAttribute('active', '');
//                 }
//             } else {
//                 tooltips.forEach(tooltip => {
//                     tooltip.removeAttribute('active');
//                 });
//             }
//         });

//         document.addEventListener('click', (e) => {
//             const tooltips = document.querySelectorAll('[am-tooltip]')

//             if (e.target.hasAttribute('am-tooltip-header') || e.target.hasAttribute('am-tooltip-content')) {
//                 if (e.target.closest('[am-tooltip]').hasAttribute('active') &&  !active) {
//                     e.target.closest('[am-tooltip]').removeAttribute('active');
//                 } else {
//                     e.target.closest('[am-tooltip]').setAttribute('active', '');
//                     active = false;
//                 }
//             } else if (e.target.closest('[am-tooltip-wrapper]') && !e.target.closest('[am-tooltip-wrapper]').hasAttribute('touch')) {
//                 tooltips.forEach(tooltip => {
//                     tooltip.removeAttribute('active');
//                 });
//                 active = false;
//             }
//         });
//     }
// }

export default Tooltip