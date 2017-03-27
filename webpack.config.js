/* eslint-env node */
const path = require('path')
const webpack = require('webpack')

const { config, vueOptions } = require('./webpack.config.base')

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
  const extractLoader = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader'
  })

  config.module.loaders.push({
    test: /\.s?css$/,
    loader: extractLoader
  })

  vueOptions.loaders.scss = vueOptions.loaders.css = extractLoader

  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('[name]/app.css')
  ])
} else {
  const DashboardPlugin = require('webpack-dashboard/plugin')

  config.plugins.push(new DashboardPlugin())

  config.devtool = 'source-map'

  config.module.loaders.push({
    test: /\.s?css$/,
    loaders: ['style-loader', 'css-loader']
  })

  vueOptions.loaders.scss = 'style-loader!css-loader'
}

module.exports = config
