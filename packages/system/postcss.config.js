/**
 * @file PostCSS Configuration
 * @see https://github.com/postcss/postcss
 */

module.exports = {
  plugins: [
    'postcss-100vh-fix',
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009'
        },
        features: {
          // ! Fixes: `Error: Expected an opening square bracket.`
          // See: https://github.com/tailwindlabs/tailwindcss/issues/1190
          'focus-within-pseudo-class': false
        }
      }
    ],
    ['cssnano', process.env.NODE_ENV !== 'development']
  ]
}
