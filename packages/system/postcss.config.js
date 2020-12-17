/**
 * @file PostCSS Configuration
 * @see https://github.com/postcss/postcss
 */

module.exports = {
  plugins: [
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009'
        },
        features: {
          'custom-properties': false
        },
        stage: 3
      }
    ]
  ]
}
