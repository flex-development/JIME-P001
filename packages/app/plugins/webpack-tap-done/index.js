/**
 * @file Implementation - TapDoneWebpackPlugin
 * @module TapDoneWebpackPlugin
 */

class TapDoneWebpackPlugin {
  constructor(callback) {
    this.name = 'TapDoneWebpackPlugin'
    this.callback = callback
  }

  apply(compiler) {
    compiler.hooks.done.tap(this.name, stats => this.callback(stats))
  }
}

module.exports = TapDoneWebpackPlugin
