const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const generateHtmlPlugin = require('nunjucks-template-loader/utils/generateHtmlPlugin');
const webpack = require('webpack');
const util = require('./utils');
const paths = require('./utils/paths');


module.exports = (env, argv) => {
    const prod = argv.mode === 'production';
    const dev = argv.mode === 'development';
    const utils = argv.utils || util;
    const pathHtml = argv.pathHtml || paths.html;
    const db = argv.db || {};

    let entry = {
        app: [
            `${paths.src}/app/index.ts`,
            `${paths.src}/scss/index.scss`,
        ]
    };

    if (prod) {
        entry['lib.component'] = [
            `${paths.root}/lib/components/index.ts`,
            `${paths.root}/lib/scss/index.scss`,
        ]
        // entry['lib.utils'] = [
        //     `${paths.root}/lib/utils/index.ts`,
        // ]
    }

    const config = {
        entry,
        output: {
            path: paths.dist,
            filename: (file) => {
                if (file.chunk.name.split('.').shift() === 'lib') {
                    return `../bin/[name].js`;
                }

                return `${paths.bundles}/js/[name].${prod ? '[chunkhash:5].' : ''}js`;
            },
            chunkFilename: `${paths.bundles}/js/[name].${prod ? '[chunkhash:5].' : ''}js`,
            publicPath: "/"
        },
        externals: {
            paths: paths
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: {}
        },
        performance: {
            hints: false,
        },
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    exclude: [/node_modules/, /\.module\.(sa|sc|c)ss$/],
                    use: [
                        {
                            loader: dev ? 'style-loader' : MiniCssExtractPlugin.loader,
                            options: {
                                esModule: false,
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                esModule: false,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                postcssOptions: {
                                    config: path.resolve(__dirname, './postcss.config.js')
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                    ]
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'ts-loader'
                    }
                },
                {
                    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+)?$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: `${paths.assets}/[name]-[hash:4].[ext]`
                    }
                },
                {
                    test: /\.html$|njk|nunjucks/,
                    exclude: [/node_modules/, /(src)/],
                    use: [
                        'html-loader',
                        {
                            loader: 'nunjucks-template-loader',
                            options: {
                                path: paths.templates,
                                filters: utils.filters,
                                data: db
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            // new CopyWebpackPlugin({
            //     patterns: [
            //         { from: `${paths.src}/${paths.assets}/`, to: `${paths.assets}/` },
            //         { from: `${paths.src}/static/`, to: 'static' }
            //     ]
            // }),
            new MiniCssExtractPlugin({
                filename: (file) => {
                    if (file.chunk.name.split('.').shift() === 'lib') {
                        return `../bin/[name].css`;
                    }

                    return `/${paths.bundles}/css/[name].${prod ? '[contenthash:5].' : ''}css`;
                },
                chunkFilename: `/${paths.bundles}/css/[id].${prod ? '[contenthash:5].' : ''}css`
            })
        ]
            .concat(generateHtmlPlugin(paths.pages, {
                minify: prod,
                inject: true,
                chunks: utils.chunks,
                filepath: `./${pathHtml}`
            }))
    }

    if (prod) {
        config.mode = 'production';
        config.plugins = config.plugins.concat([
            new CleanWebpackPlugin(),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    discardComments: {
                        removeAll: true
                    }
                },
                canPrint: true
            }),
            new FixStyleOnlyEntriesPlugin(),
        ]);
        config.optimization = {
            minimize: true
        };
    } else if (dev) {
        config.mode = 'development';
        config.devtool = 'inline-source-map';
        config.devServer = {
            // port: 4200,
            writeToDisk: true,
            compress: true,
            liveReload: false,
            // hot: true,
            historyApiFallback: true,
            watchContentBase: true,
            overlay: true,
            contentBase: `${paths.dist}/${pathHtml}`
        };
        config.plugins = config.plugins.concat([
            new webpack.ProgressPlugin(utils.handlerProgress)
        ])
    }

    return config;
};