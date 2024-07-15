'use strict'
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../app/public/'),
    filename: '[name].bundle.js',
    // publicPath: '/',
    publicPath: '/public/',
    assetModuleFilename: 'images/[hash][ext][query]',
    // clean: true,
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  devtool: 'inline-source-map',
  // 从 webpack v4 开始，移除了 CommonsChunkPlugin，取而代之的是 optimization.splitChunks
  optimization: {
    splitChunks: {
      name: "manifest",
    }
  },
  // 加载器加载顺序 数组尾部开始
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'vue-style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),

  ]
}
