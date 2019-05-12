'use strict';

const browserSync = require('browser-sync');
const webpack = require('webpack');

const config = require('./config/config');
const webpackConfig = require('./config/webpack.config');

// Use Browser Sync because of issues with Webpack HMR and ExtractTextWebpackPlugin
// https://github.com/webpack/extract-text-webpack-plugin/issues/30
// https://github.com/webpack/webpack/issues/1530

const bs = browserSync.create();

webpack(webpackConfig).watch({}, (err, stats) => {
    if (err) {
        console.log('webpack build error', err);
    } else {
        let changedModules = stats.compilation.modules.filter((module) => {
            return module.built && module.resource;
        });

        let changedStyleModules = changedModules.filter((module) => {
            return module.resource.match(/\.(css|less|sass|scss)$/);
        });

        if (changedModules.length === changedStyleModules.length) {
            bs.reload('*.css');
        } else {
            bs.reload();
        }
    }
});

bs.init({
    server: {
        baseDir: config.buildFolder
    },
    open: false
});
