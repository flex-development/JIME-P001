const rootBabelOptions = require('../../babel.config.json')

/**
 * @file Babel Configuration
 * @see https://babeljs.io/docs/en/configuration
 */

module.exports = api => {
  const env = api ? api.env().toLowerCase() : process.env.NODE_ENV

  const presets = rootBabelOptions.presets.map(preset => {
    if (preset[0] === '@babel/preset-env') {
      preset[1].modules = false
    }

    return preset
  })

  return {
    comments: env === 'development' ? true : false,
    extends: '../../babel.config.json',
    presets
  }
}
