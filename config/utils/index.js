const filters = require('nunjucks-template-loader/filters');


const utils = {
    handlerProgress: (percentage, message, ...args) => {
        const perc = (percentage * 100).toFixed(2) + '%';
        console.clear()
        console.info(perc, message);
    },
    filters,
    chunks: {
        // index: [
        //     'ui_style',
        //     'main_style'
        // ]
    }
}


module.exports = utils