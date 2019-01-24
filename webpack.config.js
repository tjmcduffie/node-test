"use strict";

const EnvEnum = require('./app/lib/EnvEnum');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

console.log('>>> webpack ENV', process.env.NODE_ENV);
module.exports = {
  entry: {
    header: path.join(__dirname, 'app', 'static_src', 'js', 'AppHeader.js'),
    content: path.join(__dirname, 'app', 'static_src', 'js', 'AppContent.js'),
  },
  output: {
    path: path.join(__dirname, 'build', 'static'),
    filename: 'js/[name].[chunkhash].bundle.js', // maybe chunkFilename
    publicPath: '/',
    library: 'Grimlock',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          // options: {
          //   babelrc: false,
          //   cacheDirectory: true,
          //   presets: [
          //     '@babel/preset-react',
          //     '@babel/preset-flow',
          //   ],
          //   plugins: [
          //     ["@babel/plugin-proposal-class-properties", {}],
          //     ["@babel/plugin-proposal-object-rest-spread"],
          //     ["@babel/plugin-proposal-optional-chaining"],
          //     ["@babel/plugin-transform-async-to-generator"],
          //     ["@babel/plugin-transform-strict-mode", { "strict": true }],
          //   ],
          // },
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: '[name]--[local]--[hash:base64:5]',
              },
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    //   },
    // }),
    // new UglifyJsPlugin({
    //   // beautify: true,
    //   // compress: false,
    //   // mangle: false,
    //   // sourcemap: true,
    //   beautify: process.env.NODE_ENV !== EnvEnum.DEV ? false: true,
    //   compress: process.env.NODE_ENV !== EnvEnum.DEV ? true: false,
    //   mangle: process.env.NODE_ENV !== EnvEnum.DEV ? true: false,
    //   sourcemap: process.env.NODE_ENV !== EnvEnum.DEV ? false: true,
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'inline',
    //   filename: 'js/inline.bundle.js',
    //   minChunks: 2,
    // }),
    new ExtractTextPlugin({
      filename: 'css/[name].bundle.css',
    }),
    // new webpack.optimize.AggressiveSplittingPlugin({
    //     minSize: 5000,
    //     maxSize: 10000
    // }),
  ],
};
