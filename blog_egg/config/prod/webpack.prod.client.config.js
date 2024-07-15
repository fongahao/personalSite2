'use strict'

const webpack = require('webpack')
const { merge } = require('webpack-merge');
const path = require('path');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
var HtmlWebpackPlugin = require('html-webpack-plugin')
const base = require('./webpack.prod.base.config');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(base, {
  entry: {
    client: path.resolve(__dirname, '/src/entry-client.js')
  },
  optimization: {
    // 开启标记功能，以便webpack进行 Tree-shaking
    usedExports: true,
    runtimeChunk: 'single',
    // 从 webpack v4 开始，移除了 CommonsChunkPlugin，取而代之的是 optimization.splitChunks
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // 不抽离注释
        extractComments: false,
        terserOptions: {
          // 删除注释
          format: {
            comments: false,
          },
          // 压缩代码时配置
          compress: {
            warnings: true,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log']
          },
        },
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueSSRClientPlugin(),
    // new BundleAnalyzerPlugin(),
    // https://www.npmjs.com/package/webpack-bundle-analyzer
  ],
})