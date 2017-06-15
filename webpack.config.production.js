const merge = require('webpack-merge');
const { config } = require('./webpack.config.base.js');

module.exports = merge(config, {
  output: {
    publicPath: '/'
  }
});
