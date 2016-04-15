const webpack = require('webpack');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const paths = [
    '/',
];

module.exports = {
    entry: {
        'main': [
            'webpack-hot-middleware/client',
            './core/index.js'
        ],
    },

    module: {
        loaders: [
            isProd ? {
                test: /.css$/,
                loader: ExtractTextPlugin.extract('style', 'css', 'postcss')
            } : {
                test: /.css$/,
                loaders: ['style', 'css', 'postcss']
            },{
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'file'
            }, {
                test: /\.js$/,
                loader: 'babel',
				exclude: /node_mdules/,
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: isProd ? [] : [
                        ['react-transform', {
                            'transforms': [{
                                'transform': 'react-transform-hmr',
                                'imports': ['react'],
                                'locals': ['module']
                            }, {
                                'transform': 'react-transform-catch-errors',
                                'imports': ['react', 'redbox-react']
                            }],
                        }],
                    ],
                },
                include: /core/
            }
        ]
    },

    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
        libraryTarget: 'umd'
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new StaticSiteGeneratorPlugin('main', paths, null),
        new ExtractTextPlugin('styles.css'),
    ].concat(isProd ? [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ] : []),

    postcss: [
        require('postcss-cssnext')
    ],
};
