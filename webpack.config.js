const webpack = require('webpack');
const merge = require('webpack-merge');
const { TARGET_FOLDER, PORT, config } = require('./webpack.config.base.js');

module.exports = merge(config, {
  entry: {
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    dev: `webpack-dev-server/client?http://localhost:${PORT}`,

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    hot: 'webpack/hot/only-dev-server'
  },
  output: {
    // necessary for HMR to know where to load the hot update chunks
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    port: PORT,
    historyApiFallback: true,
    // enable HMR on the server
    hot: true,
    // match the output path
    contentBase: TARGET_FOLDER,
    // match the output `publicPath`
    publicPath: '/'
  },
  plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()]
});
