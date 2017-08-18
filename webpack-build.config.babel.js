import merge from 'webpack-merge';
import webpack from 'webpack';
import commonConfig from './webpack-common.config.js';

const env = process.env.NODE_ENV || 'development';
const noMin = [];

let buildConfig = {
  debug: false,
  devtool: 'source-map',
  profile: true,
  watch: false,
  output: {
    publicPath: ''
  },
  module: {
    postLoaders: []
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true)
  ]
};

if (env === 'production') {
  buildConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      compress: false
    })
  );
}

//export default merge(commonConfig, buildConfig);
module.exports = merge(commonConfig, buildConfig);
