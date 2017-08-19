import path from 'path';
import webpack from 'webpack';
import dotenv from 'dotenv';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import pkg from './package.json';

const envVars = dotenv.load();

const es6dirs = [
	'src'
];
const nodeModulesDir = path.join(__dirname, 'node_modules');

export default {
	target: 'web',
	context: path.resolve(__dirname, './src'),
	entry: {
		index: './js/index.js'
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: `/js/scripts-[name].js`,
		publicPath: ''
	},
	plugins: [
    new webpack.DefinePlugin({
			'process.env': Object.keys(envVars).reduce((env, k) => {
        return {...env, [k]: JSON.stringify(envVars[k])};
      }, {}).parsed
	  }),
		new ExtractTextPlugin(
			`/css/styles.css`,
			{allChunks: true}
		)
	],
	module: {
		preLoaders: [
			{test: /\.js$/, loader: 'eslint-loader', exclude: nodeModulesDir}
		],
		loaders: [
			{
				test: /\.js$/,
				include: es6dirs.map(d => path.resolve(__dirname, d)),
				loader: 'babel',
				query: {
					cacheDirectory: true,
          presets: ['es2015', 'react']
				}
			},
			{
				test: /\.json/,
				exclude: nodeModulesDir,
				loader: 'json'
			},
			{
        test: /\.(css|scss)$/,
        //include: [path.resolve(__dirname, 'src')],
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?sourceMap&modules&importLoaders=1&'
          	//+ 'localIdentName=[name]__[local]___[hash:base64:5]'
          	+ 'localIdentName=[local]'
          	+ '!postcss-loader!sass-loader?sourceMap'
        ),
      },
			{
		    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
		    loader: 'url?limit=10000&mimetype=application/font-woff'
		  },
			{
		    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
		    loader: 'url?limit=10000&mimetype=application/octet-stream'
		  },
			{
		    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
		    loader: 'url?limit=10000&mimetype=application/vnd.ms-fontobject'
		  },
			{
		    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
		    loader: 'url?limit=10000&mimetype=image/svg+xml'
		  },
			{
		    test: /\.(png|jpg)$/,
		    loader: 'url'
		  }
		]
	},
	eslint: {
	  configFile: '.eslintrc'
	},
	postcss() {
		return [autoprefixer];
	}
};
