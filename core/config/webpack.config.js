const path = require('path');
const webpack = require('webpack');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const paths = [
    '/',
];

module.exports = {
    entry: {
		'main': [
			'webpack-hot-middleware/client',
	        path.join(__dirname, '../index.js')
	    ]
	},

    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../../dist'),
		// publicPath: '/dist/',
        libraryTarget: 'umd'
    },

	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
    	new webpack.NoErrorsPlugin(),
		new StaticSiteGeneratorPlugin('main', paths, null)
	].concat(isProd ? [
	    new webpack.optimize.UglifyJsPlugin({
	        compressor: {
	            warnings: false
	        }
	    }),
		new webpack.optimize.DedupePlugin(),
		new webpack.DefinePlugin({
	        'process.env': {
	            'NODE_ENV': JSON.stringify('production')
	        }
	    })
	] : []),

    module: {
        loaders: [{
            test: /\.js$/,
			loader: 'babel',
			query: {
          		presets: [ 'react', 'es2015', 'stage-0' ],
				plugins: isProd ? [] : [
				    ['react-transform', {
				        'transforms': [{
				            'transform': 'react-transform-hmr',
				            'imports': ['react'],
				            'locals': ['module'],
				        }, {
				            'transform': 'react-transform-catch-errors',
				            'imports': ['react', 'redbox-react'],
				        }],
				    }],
				]
			},
			include: [
				path.join(__dirname, '../')
			]
        }]
    }
};
