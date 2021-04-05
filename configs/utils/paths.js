const path = require('path');


const rootPath = path.join(__dirname, '..', '..')


const paths = {
    root: rootPath,
    src: path.join(rootPath, 'src'),
    dist: path.join(rootPath, 'dist'),
    templates: path.join(rootPath, 'templates'),
    pages: path.join(rootPath, 'templates', 'pages'),
    postcss: path.join(rootPath, 'configs', 'postcss.config.js'),
    assets: 'assets',
    bundles: 'bundles',
    html: 'html'
}


module.exports = paths