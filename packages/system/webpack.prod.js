const TapDoneWebpackPlugin = require('@flex-development/webpack-tap-done')
const debug = require('debug')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const fse = require('fs-extra')
const { resolve } = require('path')
const { DefinePlugin } = require('webpack')
const pkg = require('./package.json')
const wc = require('./webpack.common')

/**
 * @file Production Webpack Configuration - Design System Styles
 * @see {@link https://webpack.js.org/configuration}
 */

const PRODUCTION = process.env.NODE_ENV.toLowerCase() === 'production'
const PKG_NAME_NO_SCOPE = pkg.name.split('/')[1]

const logger = debug(`${PKG_NAME_NO_SCOPE}`).extend('webpack.prod')

module.exports = {
  entry: './src/scss/index.scss',
  mode: PRODUCTION ? 'production' : 'development',
  output: {
    filename: 'css.js',
    path: resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'static/fonts'
            }
          }
        ]
      },
      {
        test: /\.(gif|jpeg|jpg|png|svg|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'static/images'
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader].concat(wc.module.rules[0].use)
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': process.env.NODE_ENV.toLowerCase()
    }),
    new MiniCssExtractPlugin({ filename: `${PKG_NAME_NO_SCOPE}.css` }),
    new TapDoneWebpackPlugin(async () => {
      // Get paths to scss directories
      const scss_src = resolve(__dirname, 'src/scss')
      const scss_dest = resolve(__dirname, 'dist/scss')

      // Copy `src/scss` to `dist/scss`
      await fse.copy(scss_src, scss_dest)

      // Remove `css.js` file
      await fse.remove(resolve(__dirname, 'dist/css.js'))

      logger('finished cleaning up `dist` directory.')
    })
  ]
}
