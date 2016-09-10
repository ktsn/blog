const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin')

const postcss = [
  autoprefixer({
    browsers: ['> 1%', 'last 2 versions', 'ie >= 9']
  })
]

module.exports = {
  resolve: {
    modules: [
      path.resolve(__dirname, 'web/static'),
      'node_modules'
    ],
    extensions: ['', '.js', '.vue']
  },
  module: {
    preLoaders: [
      { test: /\.vue$/, loader: 'eslint', exclude: /node_modules/ },
      { test: /\.js$/, loader: 'eslint', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'postcss' },
      { test: /\.scss$/, loader: 'postcss!sass' }
    ],
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.json$/, loader: 'json' }
    ]
  },
  plugins: [
    new FlowStatusWebpackPlugin({
      failOnError: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  postcss,
  vue: {
    loaders: {},
    postcss
  },
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
