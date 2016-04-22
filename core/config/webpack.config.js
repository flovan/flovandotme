'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const ejs = require('ejs');

const PRODUCTION = process.NODE_ENV === 'production';
const config = require('./config');
const routes = [
    '/',
    '/about'
];

const template = ejs.compile(fs.readFileSync(path.resolve(process.cwd(), 'src/template.html'), 'utf-8'));
const ExtractFrontCss = new ExtractTextPlugin('front', 'front.css');

module.exports =  {
    entry: {
		'front.app': path.resolve(process.cwd(), 'core/index.js'),
		'front.style': path.resolve(process.cwd(), 'src/sass/main.scss')
	},

    output: {
		filename: '[name].js',
        chunkFilename: '[name].js',
        path: path.resolve(process.cwd(), config.buildFolder),
        libraryTarget: 'umd'
    },

	resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.scss'],
    },

    module: {
        loaders: [{
            test: /\.scss$/,
			include: /src\/sass/,
            loader: ExtractFrontCss.extract('style', 'css!postcss!sass')
        }, {
            test: /\.jsx?$/,
            include: /(core|src)/,
            loader: 'babel'
        }]
    },

    postcss: function() {
        return [
            autoprefixer({
                browsers: ['> 1%', 'last 2 versions', 'IE 9']
            })
        ];
    },

    plugins: [
        ExtractFrontCss,
        new StaticSiteGeneratorPlugin('front.app', routes, {
            template: template
        })
    ].concat(PRODUCTION ? [
		new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            mangle: true,
            screw_ie8: true,
        })
	] : []),

    devtool: 'cheap-module-source-map'
};
