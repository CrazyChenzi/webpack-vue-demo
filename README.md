# webpack-vue-demo
基于webpack手动搭建vue环境

## 搭建webpack运行环境

```js
npm init -y
npm install webpack webpack-cli -D
```

## 搭建基础项目配置

```js
/**
 * webpack.base.conf.js是公共配置文件，主要实现以下功能
 * 字体处理 url-loader
 * 处理图片及优化 url-loader
 * 识别Vue文件 vue-loader
 * 启用babel转码，es6->es5 babel
 * 音乐文件处理 url-loader
 * 配置打包后的html模块 HtmlWebpackPlugin
 * 配置resolve模块解析
 * @author blacklisten
 * @date 2020-03-24
 */

const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['babel-polyfill', path.resolve(__dirname, '../src/main.js')],
  output: {
    filename: 'js/[name].[hash:5].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: './'
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|git|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name]-[hash:5].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name]-[hash:5].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              name: 'media/[name]-[hash:5][ext]'
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      filename: 'index.html'
    })
  ]
}

```

## 开发环境配置

```js
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

```

## 运行环境配置

```js
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
```

## 遇到的问题

去掉style-loader即可[vue mini-css-extract-plugin document is not defined](https://github.com/vuejs/vue-ssr-docs/issues/196)

[vue  Using browsers option can cause errors. Browserslist config can be used for Babel, Autoprefixer, postcss-normalize and other tools.](https://github.com/browserslist/browserslist#readme)

[sass配置](https://vue-loader.vuejs.org/zh/guide/pre-processors.html#sass)

[vue  webpack4 es6  to es5](https://juejin.im/post/5c68f4e9e51d454be11473b9)
