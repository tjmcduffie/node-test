"use strict";

const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = function(env, argv) {
  const outputPath = path.join(__dirname, 'build', 'static');
  const generatedPath = path.resolve(__dirname, 'generated');
  const isDev = !(process.env.NODE_ENV === 'production' || argv.mode === 'production');
  console.log('>>> webpack ENV', process.env.NODE_ENV, isDev, argv);

  return {
    entry: {
      header: path.join(__dirname, 'app', 'static_src', 'js', 'AppHeader.js'),
      content: path.join(__dirname, 'app', 'static_src', 'js', 'AppContent.js'),
    },
    output: {
      path: outputPath,
      filename: !isDev ? 'js/[name].[chunkhash].js' : 'js/[name].js',
      publicPath: '/',
      library: 'Grimlock',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: path.resolve(__dirname, 'node_modules'),
          use: [
            {loader: 'babel-loader'},
          ],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            {loader: MiniCssExtractPlugin.loader},
            {loader: 'css-loader', options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]--[local]--[hash:base64:5]',
            }},
            {loader: 'postcss-loader', options: {
              sourceMap: 'inline',
              convertToAbsoluteUrls: true,
              plugins: [
                require('postcss-modules')({
                  generateScopedName: '[local]',
                }),
              ],
            }},
          ],
        },
      ],
    },
    optimization: {
      minimizer: [
        new TerserPlugin(),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
    plugins: [
      new CleanWebpackPlugin([outputPath]),
      new MiniCssExtractPlugin({
        filename: !isDev ? 'css/[name].[chunkhash].css' : 'css/[name].css',
        chunkFilename: 'css/[id].css',
      }),
      new WebpackAssetsManifest({
        output: `${generatedPath}/asset-manifest.json`,
        writeToDisk: true,
      }),
    ],
    devtool: 'inline-source-map',
    devServer: {
      compress: true,
      contentBase: [path.join(__dirname, 'app', 'static_src', 'img')],
      hot: true,
      writeToDisk: true,
    },
  };
};
