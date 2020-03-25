/**
 * webpack.prod.conf.js是生产环境配置文件
 * 打包处理css、scss文件
 * mini-css-extract-plugin抽离样式为单独css文件
 * postcss-loader自动添加前缀
 * clean-webpack-plugin每次打包清理创建的dist文件夹
 * optimize-css-assets-webpack-plugin压缩css文件代码
 * terser-webpack-plugin压缩js文件代码
 * @author blacklisten
 * @date 2020-03-24
 */

const webpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const webpack = require('webpack')
// 抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 清理dist
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 压缩js
const TerseWebpackPlugin = require('terser-webpack-plugin')

module.exports = merge(webpackConfig, {
  mode: 'production',
  devtool: 'clean-source-map',
  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => []
            }
          },
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: true,
              // sass-loader version >= 8
              sassOptions: {
                indentedSyntax: true
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash:5].css',
      chunkFilename: 'css/[id]-[hash:5].css'
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  optimization: {
    minimizer: [
      // 压缩css
      new OptimizeCssAssetsWebpackPlugin({}),
      // 压缩js
      new TerseWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  }
})
