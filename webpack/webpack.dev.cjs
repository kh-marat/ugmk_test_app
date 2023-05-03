const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./webpack.common')

const BUILD_DIR = path.resolve(__dirname, '../build')

const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    publicPath: '/',
  },
  devServer: {
    hot: true,
    open: true,
    port: 3000,
    static: {
      directory: BUILD_DIR,
    },
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}

module.exports = merge(commonConfig, devConfig)
