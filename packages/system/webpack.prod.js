const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const { DefinePlugin } = require('webpack')
const wc = require('./webpack.common')

/**
 * @file Production Webpack Configuration - Design System Styles
 * @see {@link https://webpack.js.org/configuration}
 */

const PRODUCTION = process.env.NODE_ENV.toLowerCase() === 'production'

module.exports = {
  entry: './src/scss/index.scss',
  mode: PRODUCTION ? 'production' : 'development',
  output: {
    filename: 'css.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader].concat(wc.module.rules[0].use)
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': process.env.NODE_ENV.toLowerCase(),
      'process.env.TYPEKIT_ID': process.env.TYPEKIT_ID
    }),
    new MiniCssExtractPlugin({ filename: 'kustomzdesign.css' })
  ]
}
