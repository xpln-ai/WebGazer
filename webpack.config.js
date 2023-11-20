const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

const bannerString =`
 WebGazer.js: Democratizing Webcam Eye Tracking on the Browser
 Copyright (c) 2016, Brown WebGazer Team
 Licensed under GPLv3. Companies with a valuation of less than $1M can use WebGazer.js under LGPLv3.
 `;

const varConfig = {
	entry: './src/index.mjs',
	output: {
		filename: 'webgazer.js',
		library: {
			name: 'webgazer',
			type: 'var',
			export: 'default',
		},
		path: path.resolve(__dirname, 'dist'),
	},
	module:	{
		rules: [
			{
				test: /\.mjs$/,
				type: 'javascript/auto',
				exclude: /node_modules/,
				resolve: {
					fullySpecified: false,
				},
			}
		]
	},
	resolve: {
		extensions: [".mjs", ".webpack.js", ".web.js", ".js", ".json"]
	},
	optimization: {
		minimizer: [new TerserPlugin({
			extractComments: false,
		})],
	},
	plugins: [
		new webpack.BannerPlugin(bannerString),
		new	FileManagerPlugin({
			events: {
				onEnd: {
					copy: [
						/* xpln.ai 2023-11-19: Disable useless copy to ./www/
			            { source: './dist/webgazer.js', destination: './www/' },
			            { source: './dist/webgazer.js.map', destination: './www/' },
			            { source: './dist/webgazer.js', destination: './www/data/src/' },
			            { source: './dist/webgazer.js.map', destination: './www/data/src/' },
						*/
						// xpln.ai 2023-11-19: Instead we copy to our own chrome extension
						{ source: './dist/webgazer.js', destination: '../xpln.ai/scripts_crea/chrome_extension/ext/webgazer/webgazer.js', options: { overwrite: true } },
			        ],
				},
			},
		}),
	],
	devtool: "source-map"
};

const commonjs2Config = {
	entry: './src/index.mjs',
	output: {
		filename: 'webgazer.commonjs2.js',
		library: {
			name: 'webgazer',
			type: 'commonjs2',
			export: 'default',
		},
		path: path.resolve(__dirname, 'dist'),
	},
	module:	{
		rules: [
			{
				test: /\.mjs$/,
				type: 'javascript/auto',
				exclude: /node_modules/,
				resolve: {
					fullySpecified: false,
				},
			}
		]
	},
	resolve: {
		extensions: [".mjs", ".webpack.js", ".web.js", ".js", ".json"]
	},
	optimization: {
		minimizer: [new TerserPlugin({
			extractComments: false,
		})],
	},
	plugins: [
		new webpack.BannerPlugin(bannerString),
	],
	devtool: "source-map"
};

module.exports = [varConfig, commonjs2Config]
