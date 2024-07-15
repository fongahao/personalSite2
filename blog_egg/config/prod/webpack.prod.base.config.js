'use strict'
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  mode: 'production',
  // mode: 'development',
  output: {
    path: path.resolve(__dirname, '../../../blog/build/'),       // 部署
    publicPath: '/', // 挂载 build:www ，不能是 'build'            // 部署
    // path: path.resolve(__dirname, '../../app/public/dist'),   // 开发
    // publicPath: '/public/dist',                               // 开发
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/lazy.[name].[chunkhash].js',                 // 动态导入的chunk名称,按需加载
    assetModuleFilename: 'images/[hash][ext][query]',
    // clean: true,
  },
  resolve: {
    extensions: ['.js', '.vue'],
    // alias: {
    //   '@ant-design/icons/lib/dist$': path.resolve(__dirname, 'utils/antdIcon/antdIcon.js')
    // }

  },
  externals: {
    'highlight.js': 'hljs',
  },
  // devtool: 'source-map',
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
          // 将 css 插入 DOM 中
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
        use: 'vue-loader',
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/lazy.[chunkhash].css'
    }),
    new CompressionPlugin(
      {
        // filename: '[path].gz',
        algorithm: 'gzip',
        test: new RegExp('\\.(js|css|png)$'),
        // 只处理大于xx字节 的文件，默认：0
        threshold: 1024,
        // 示例：一个1024b大小的文件，压缩后大小为768b，minRatio : 0.75
        minRatio: 0.8, // 默认: 0.8
        // 是否删除源文件，默认: false
        deleteOriginalAssets: false,

      }
    ),
    // new ImageMinimizerPlugin({
    //   minimizer: {},
    //   test: /\.(jpe?g|png|gif|svg)$/i,
    // }),
  ]
}
