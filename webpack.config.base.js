const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_FOLDER = path.resolve(__dirname, 'src');
const TARGET_FOLDER = path.resolve(__dirname, 'dist');

const config = {
  context: SRC_FOLDER,
  entry: {
    // the entry point of our app
    app: path.resolve(SRC_FOLDER, 'index.js')
  },
  output: {
    path: TARGET_FOLDER,
    filename: '[name].[hash:8].js',
    chunkFilename: '[id].js'
  },
  module: {
    rules: [
      { test: /\.(gif|jpg|jpeg|png)/, use: 'file-loader' },
      { test: /\.svg$/, use: 'svg-inline-loader' },
      {
        test: /\.(woff|woff2|eot|ttf)/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }
      },
      {
        test: /(\.css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?sourceMap&importLoaders=1', 'postcss-loader']
        })
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json'],
    modules: [SRC_FOLDER, 'node_modules'],
    mainFields: ['jsnext:main', 'browser', 'module', 'main']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      env: process.env.NODE_ENV
    }),
    new ExtractTextPlugin('[name].[hash:8].css')
  ]
};

module.exports = { TARGET_FOLDER, SRC_FOLDER, config };
