'use strict'

const path = require('path');
const { merge } = require('webpack-merge');
const base = require('./webpack.prod.base.config');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const nodeExternals = require('webpack-node-externals')
module.exports = merge(base, {
    entry: {
        server: path.resolve(__dirname, '/src/entry-server.js')
    },
    // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
    // 并且还会在编译 Vue 组件时，告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
    target: 'node',
    // source map 支持
    devtool: 'source-map',
    // 使用 Node 风格导出模块
    output: {
        libraryTarget: 'commonjs2'
    },
    // 外置化应用程序依赖模块。可以使服务器构建速度更快，
    // 并生成较小的 bundle 文件。
    // externals: nodeExternals(
        // {
    // 不要外置化 webpack 需要处理的依赖模块。
    // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
    // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
        // allowlist: [/\.css$/]
    // }
    // ),
    plugins: [
        new VueSSRServerPlugin()
    ]
})
