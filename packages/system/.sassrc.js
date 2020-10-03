const path = require('path')
const implementation = require('sass')

/**
 * @file Webpack Sass Loader Options
 * @see https://webpack.js.org/loaders/sass-loader/
 */

module.exports = {
  implementation,
  sassOptions: {
    includePaths: ['src/theme/'],
    indentedSyntax: false,
    outputStyle: 'expanded'
  }
}
