const path = require('path')
const webpack = require('webpack')
const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin')

const vueOptions = exports.vueOptions = {
  esModule: true,
  loaders: {},
  preLoaders: {
    scss: 'sass-loader'
  }
}

exports.config = {
  resolve: {
    alias: {
      lodash: 'lodash-es'
    },
    modules: [
      path.resolve(__dirname, 'web/static'),
      'node_modules'
    ],
    extensions: ['.js', '.vue']
  },
  module: {
    loaders: [
      { enforce: 'pre', test: /\.vue$/, loader: 'eslint-loader', exclude: /node_modules/ },
      { enforce: 'pre', test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/ },
      { enforce: 'pre', test: /\.css$/, loader: 'postcss-loader' },
      { enforce: 'pre', test: /\.scss$/, loaders: ['postcss-loader', 'sass-loader'] },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.vue$/, loader: 'vue-loader', options: vueOptions }
    ]
  },
  plugins: [
    new FlowStatusWebpackPlugin({
      failOnError: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  devServer: {
    proxy: {
      '**': {
        target: 'http://localhost:4000/',
        contentBase: 'priv/static',
        changeOrigin: true,
        router: {
          'localhost:8080' : 'http://localhost:4000'
        }
      }
    }
  }
}
