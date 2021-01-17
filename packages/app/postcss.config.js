const config = require('@flex-development/kustomzdesign/postcss.config')
const omit = require('lodash').omit

/**
 * @file PostCSS Configuration
 * @see https://nextjs.org/docs/advanced-features/customizing-postcss-config
 */

module.exports = omit(config, ['syntax'])
