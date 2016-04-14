var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const Config = require('./core/config/Config');

module.exports = {
	entry: {
		main: './core/index.js'
	},
	output: {
		path: 'dist',
		filename: 'bundle.js',
		libraryTarget: 'umd'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
                    compact: false,
                    presets: ['stage-2'],
                    plugins: [
                        'transform-strict-mode',
                        'transform-class-properties',
                        'transform-es2015-template-literals',
                        'transform-es2015-arrow-functions',
                        'transform-es2015-classes',
                        'transform-es2015-spread',
                        'transform-react-jsx'
                    ]
                }
			},
			{ test: /\.css$/, loader: 'style-loader!css-loader' }
		]
	},
	plugins: [
		new StaticSiteGeneratorPlugin('main', Config.routes, Config)
	]
};
