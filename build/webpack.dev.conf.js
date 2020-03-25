/**
 * webpack.base.dev.js是开发环境配置文件，主要负责以下功能
 * 打包处理css和scss文件，启用sourceMap方便定位调试
 * postcss-loader自动添加前缀
 * 配置devServe开启热更新
 * @author blacklisten
 * @date 2020-03-24
 */
const path = require('path')
const webpackConfig = require('./webpack.base.conf')
const webpack = require('webpack')
const merge = require('webpack-merge')

module.exports = merge(webpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(c|sc|sa)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
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
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    port: 9000,
    overlay: {
      warnings: true,
      errors: true
    },
    publicPath: '/'
  },
  plugins: [
    // 启用模块热替换(HMR)
    new webpack.HotModuleReplacementPlugin(),
    // 当开启HMR的时候使用该插件会显示模块的相对路径
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
})
