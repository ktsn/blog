/* eslint-env node */
const path = require('path')
const webpack = require('webpack')

const config = require('./webpack.config.base')

config.context = path.resolve(__dirname, 'web/static')
config.entry = {
  admin: ['./admin/main.scss', './admin/main.js']
}
config.output = {
  path: path.resolve(__dirname, 'priv/static'),
  filename: '[name]/app.js',
  publicPath: '/'
}

if (process.env.NODE_ENV === 'production') {
  const ExtractTextPlugin = require('extract-text-webpack-plugin')

  config.module.loaders.push({
    test: /\.s?css$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style',
      loader: 'css'
    })
  })

  config.vue.loaders.scss = ExtractTextPlugin.extract({
    fallbackLoader: 'style',
    loader: 'css!sass'
  })

  config.vue.loaders.css = ExtractTextPlugin.extract({
    fallbackLoader: 'style',
    loader: 'css'
  })

  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('[name]/app.css')
  ])
} else {
  config.devtool = 'source-map'

  config.vue.loaders.scss = 'style!css!sass'
  config.module.loaders.push({ test: /\.s?css$/, loader: 'style!css' })
}

module.exports = config
