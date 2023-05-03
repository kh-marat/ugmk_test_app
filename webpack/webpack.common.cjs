const path = require('path')

// eslint-disable-next-line no-undef
const SRC_DIR = path.resolve(__dirname, '../src')

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: [SRC_DIR, 'node_modules'],
    alias: {
      '../img': '../public/img',
    },
  },
  entry: {
    index: [SRC_DIR + '/index.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)?$/,
        use: ['swc-loader'],
        include: path.resolve(SRC_DIR),
      },
      {
        test: /\.(scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
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
}
