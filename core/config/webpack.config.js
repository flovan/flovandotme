'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const ejs = require('ejs');
const template = ejs.compile(fs.readFileSync(path.join(__dirname, '../../src/template.html'), 'utf-8'));

const config = require('./config');
const routes = [
    '/',
    '/about'
];


module.exports =  {
    entry: path.join(__dirname, '../index.js'),

    output: {
        filename: `${config.bundleName}.js`,
        path: '/' + config.buildFolder,
        libraryTarget: 'umd'
    },

    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css?modules&sourceMap!postcss')
        }, {
            test: /\.js$/,
            include: /(core|src)/,
            loader: 'babel'
        }]
    },

    postcss: function() {
        return [
            autoprefixer({
                browsers: ['> 1%', 'last 2 versions', 'IE 9']
            }),
            precss
        ];
    },

    plugins: [
        new ExtractTextPlugin(`${config.bundleName}.css`, {
            allChunks: true
        }),
        new StaticSiteGeneratorPlugin('main', routes, {
            template: template
        })
    ],

    devtool: 'cheap-module-source-map'
};
