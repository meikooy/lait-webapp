import path from 'path';
import merge from 'webpack-merge';
import commonConfig from './webpack-common.config';

const serverConfig = merge(commonConfig, {
  debug: true,
  devtool: 'cheap-module-inline-source-map',
  profile: false,
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  output: {
    pathinfo: true
  },
  devServer: {
    contentBase: 'dist/',
    port: 8080,
    hot: false,
    inline: true,
    historyApiFallback: true,
    colors: true,
    stats: 'normal'
  }
});

//export default serverConfig;
module.exports = serverConfig;
