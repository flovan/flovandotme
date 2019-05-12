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
const ExtractFrontCss = new ExtractTextPlugin('main', 'assets/css/main.css');

module.exports =  {
    entry: {
		app: path.resolve(process.cwd(), 'core/index.js'),
		vendor: ['fontfaceobserver']
	},

    output: {
		filename: '[name]-[hash:6].js',
        path: path.resolve(process.cwd(), config.buildFolder),
		publicPath: '/',
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
            loader: 'babel',
			query: {
				// presets: ['es2015'],
				compact: true
			}
        }, {
			test: /\.(jpe?g|png|gif|svg)$/i,
			loaders: [
	            'file?name=assets/images/[name].[ext]',
	            'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
	        ],
			include: /src\/assets\/images/
		}, {
			test: /\.(woff|woff2|svg|eot|ttf)$/,
			loader: `file?name=assets/fonts/[name].[ext]`,
			include: /src\/assets\/fonts/
		}]
    },

    postcss: function() {
        return [
            autoprefixer({
                browsers: ['> 1%', 'last 2 versions', 'IE 9']
            })
        ];
    },

	sassLoader: {
		sourceMap: false
	},

    plugins: [
		// new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        ExtractFrontCss,
        new StaticSiteGeneratorPlugin('app', routes, {
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
	] : [])
};
