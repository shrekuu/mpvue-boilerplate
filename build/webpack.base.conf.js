var path = require('path')
var utils = require('./utils')
var config = require('../config')
var webpack = require('webpack')
var vueLoaderConfig = require('./vue-loader.conf')
var MpvuePlugin = require('webpack-mpvue-asset-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
const MpvueEntry = require('mpvue-entry')

let wecosConfig
let cosBaseUrl
try {
  wecosConfig = require('../wecos.config')
  cosBaseUrl = wecosConfig.baseUrl
} catch (ex) {
  console.log('没有找到 wecos 配置, 增加 wecos.config.json 以便使用腾讯对象存储放置图片')
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// 生成一个随机字符串
function generateHashStr () {
  + new Date()
}

const entry = MpvueEntry.getEntry({ config: resolve('src/entry.js') })

let baseWebpackConfig = {
  // 如果要自定义生成的 dist 目录里面的文件路径，
  // 可以将 entry 写成 {'toPath': 'fromPath'} 的形式，
  // toPath 为相对于 dist 的路径, 例：index/demo，则生成的文件地址为 dist/index/demo.js
  entry,
  target: require('mpvue-webpack-target'),
  output: {
    path: config.build.assetsRoot,
    jsonpFunction: 'webpackJsonpMpvue',
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': 'mpvue',
      '@': resolve('src')
    },
    symlinks: false,
    aliasFields: ['mpvue', 'weapp', 'browser'],
    mainFields: ['browser', 'module', 'main']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'mpvue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.vue$/,
        loader: 'mpvue-config-loader',
        exclude: [resolve('src/components')],
      },
      {
        test: /\.js$/,
        include: [resolve('src'), resolve('test')],
        use: [
          'babel-loader',
          {
            loader: 'mpvue-loader',
            options: Object.assign({checkMPEntry: true}, vueLoaderConfig)
          },
        ]
      },
      // 替换指向对象存储的资源的链接
      // 将样式里指向 /cos/images 的背景图片地址指向对象存储里文件地址并加上随机字符串
      // 将 /static/images 本地图片一地址加上随机字符串
      // 修改这里正则时注意前后行断言
      {
        test: /\.vue$/,
        loader: 'string-replace-loader2',
        options: {
          find: /(?<=background-image:\s*url\()[^)]+(?=\))/g,
          replace: function (match) {
            
            // 去掉引号
            if (/^('|")[^'"]+('|")$/.test(match)) {
              match = match.slice(1, -1)
            }

            // 本地图片, 图片放在了 src/static 目录
            if (/^\/static\/images\/.*\.(png|jpg|jpeg|svg|gif)$/.test(match)) {
              return match + '#' + generateHashStr()
            }

            // cos 图片
            if (cosBaseUrl && /^\/cos\/static\/images\/.*\.(png|jpg|jpeg|svg|gif)$/.test(match)) {
              return cosBaseUrl + match.substr(4) + '#' + generateHashStr()
            }

            return match
          },
        },
      },

      // 将模版里指向 /cos/images 的图片地址指向对象存储里文件地址并加上随机字符串
      // 将 /static/images 本地图片一地址加上随机字符串
      {
        test: /\.vue$/,
        loader: 'string-replace-loader2',
        options: {
          find: /(?<=src=")[^"]+(?=")/g,
          replace: function (match) {
            
            // 本地图片, 图片放在了 src/static 目录
            if (/^\/static\/images\/.*\.(png|jpg|jpeg|svg|gif)$/.test(match)) {
              return match + '#' + generateHashStr()
            }

            // cos 图片
            if (cosBaseUrl && /^\/cos\/static\/images\/.*\.(png|jpg|jpeg|svg|gif)$/.test(match)) {
              return cosBaseUrl + match.substr(4) + '#' + generateHashStr()
            }

            return match
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[ext]')
        }
      }
    ]
  },
  plugins: [
    // api 统一桥协议方案
    new webpack.DefinePlugin({
      'mpvue': 'global.mpvue',
      'mpvuePlatform': 'global.mpvuePlatform'
    }),
    new MpvuePlugin(),

    // mpvue entry
    new MpvueEntry(),

    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: path.resolve(config.build.assetsRoot, './static'),
        ignore: ['.*']
      }
    ])
  ]
}

module.exports = baseWebpackConfig
