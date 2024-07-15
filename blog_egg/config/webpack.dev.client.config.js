'use strict'

const webpack = require('webpack')
const { merge } = require('webpack-merge');
const path = require('path');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
var HtmlWebpackPlugin = require('html-webpack-plugin')
const base = require('./webpack.dev.base.config');

module.exports = merge(base, {
  entry: {
    client: path.resolve(__dirname, '/src/entry-client.js')
  },
  // watch: true,
  plugins: [
    // new CleanWebpackPlugin(),
    new VueSSRClientPlugin()
    // new HtmlWebpackPlugin({
    //   title: '个人网站',
    //   template: path.resolve(__dirname, '/src/index.template.html'),
    //   filename: 'index.template.html',
    //   publicPath: '/public/dist',
    //   inject: false,
    //   // inject: 'head',
    // }),
    // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
    // 以便可以在之后正确注入异步 chunk。
    // 这也为你的 应用程序/vendor 代码提供了更好的缓存。
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "manifest",
    //   minChunks: Infinity
    // }),
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。

  ],
  // 从 webpack v4 开始，移除了 CommonsChunkPlugin，取而代之的是 optimization.splitChunks
  // optimization: {
  //   splitChunks: {
  //     name: "manifest",
  //   }
  // }
  // devServer: {
  //   static: '../dist/index.template.html',
  //   hot: true,
  // }
})