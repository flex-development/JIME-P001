/**
 * @file Implementation - TapDoneWebpackPlugin
 * @module plugins/TapDoneWebpackPlugin
 */

class TapDoneWebpackPlugin {
  constructor(callback) {
    this.callback = callback
  }

  apply(compiler) {
    compiler.hooks.done.tap('TapDoneWebpackPlugin', stats => {
      this.callback(stats)
    })
  }
}

module.exports = TapDoneWebpackPlugin
