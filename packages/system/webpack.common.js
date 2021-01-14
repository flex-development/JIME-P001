const implementation = require('sass')

/**
 * @file Common Webpack Configuration - Design System Styles
 * @see {@link https://webpack.js.org/configuration}
 */

module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: {
              additionalData: `$env: ${process.env.NODE_ENV};`,
              implementation,
              sassOptions: {
                includePaths: ['src/scss/'],
                indentedSyntax: false,
                outputStyle: 'expanded'
              }
            }
          }
        ]
      }
    ]
  }
}
