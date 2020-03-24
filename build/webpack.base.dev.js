/**
 * webpack.base.dev.js是开发环境配置文件，主要负责以下功能
 * 打包处理css和scss文件，启用sourceMap方便定位调试
 * postcss-loader自动添加前缀
 * 配置devServe开启热更新
 * @author blacklisten
 * @date 2020-03-24
 */
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js'
  }
}