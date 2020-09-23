/**
 * @file Prettier Configuration
 * @see {@link https://prettier.io/docs/en/configuration.html}
 * @see {@link https://github.com/google/gts/blob/master/.prettierrc.json}
 */

module.exports = {
  // Import Prettier config from Google TypeScript Style
  ...require('gts/.prettierrc.json'),

  // Add our custom rules
  htmlWhitespaceSensitivity: "strict",
  jsxBracketSameLine: false,
  jsxSingleQuote: true,
  quoteProps: 'as-needed',
  printWidth: 80,
  proseWrap: 'always',
  semi: false,
  tabWidth: 2
}
