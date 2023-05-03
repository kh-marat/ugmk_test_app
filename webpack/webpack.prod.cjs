const path = require('path')
const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const commonConfig = require('./webpack.common')

const BUILD_DIR = path.resolve(__dirname, '../build')

const prodConfig = {
  mode: 'production',
  output: {
    publicPath: '/',
    path: BUILD_DIR,
    filename: 'js/[name].[fullhash].bundle.js',
    sourceMapFilename: 'js/[name].[chunkhash].bundle.map',
    chunkFilename: 'js/[id].[chunkhash].chunk.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 250000,
      maxInitialRequests: 3,
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: false,
          ecma: 6,
          mangle: true,
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[fullhash].css',
      chunkFilename: '[id].[fullhash].css',
    }),
    new HtmlWebpackPlugin(
      {
        inject: true,
        template: './public/index.html',
      },
    ),
  ],
}

module.exports = merge(commonConfig, prodConfig)
