const path = require('path');


const rootPath = path.join(__dirname, '..', '..')


const paths = {
    root: rootPath,
    src: path.join(rootPath, 'app'),
    dist: path.join(rootPath, 'docs'),
    templates: path.join(rootPath, 'templates'),
    pages: path.join(rootPath, 'templates', 'pages'),
    postcss: path.join(rootPath, 'configs', 'postcss.config.js'),
    assets: 'assets',
    bundles: 'bundles',
    html: ''
}


module.exports = paths