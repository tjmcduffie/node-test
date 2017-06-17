"use strict";

const EnvEnum = require('./app/lib/EnvEnum');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

console.log('webpack process.env.NODE_ENV', process.env.NODE_ENV);
module.exports = {
  entry: {
    // all:  path.join(__dirname, 'app', 'static_src', 'js', 'all.js'),
    header: path.join(__dirname, 'app', 'static_src', 'js', 'AppHeader.js'),
    content: path.join(__dirname, 'app', 'static_src', 'js', 'AppContent.js'),
    // test: path.join(__dirname, 'app', 'static_src', 'js', 'test.js'),
  },
  output: {
    path: path.join(__dirname, 'dist', 'static'),
    filename: 'js/[name].bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          cacheDirectory: true,
          presets: [
            'react',
            'flow',
          ],
          plugins: [
            ["transform-strict-mode", { "strict": true }],
            ["transform-class-properties", {}],
          ]
        },
      },
    // }, {
    //   test: /\.css$/,
    //   loader: ExtractTextPlugin.extract({use: 'css-loader'}),
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    }),
    new UglifyJsPlugin({
      beautify: process.env.NODE_ENV !== EnvEnum.DEV ? false: true,
      compress: process.env.NODE_ENV !== EnvEnum.DEV ? true: false,
      mangle: process.env.NODE_ENV !== EnvEnum.DEV ? true: false,
      sourcemap: process.env.NODE_ENV !== EnvEnum.DEV ? false: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'inline',
      filename: 'js/inline.bundle.js',
      minChunks: 2,
    }),
    // new ExtractTextPlugin({
    //   filename: 'css/[name].bundle.css',
    // }),
    // new webpack.optimize.AggressiveSplittingPlugin({
    //     minSize: 5000,
    //     maxSize: 10000
    // }),
  ],
};
