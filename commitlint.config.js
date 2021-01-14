const { utils } = require('@commitlint/config-lerna-scopes')

/**
 * @file Commitlint Configuration
 * @see https://commitlint.js.org/#/guides-local-setup
 * @see https://www.conventionalcommits.org/en/v1.0.0/#specification
 */

module.exports = {
  /**
   * If true, enable default ignore rules.
   *
   * @property {boolean} defaultIgnores
   */
  defaultIgnores: true,

  /**
   * Resolveable ids to commitlint configurations to extend
   *
   * @see https://www.conventionalcommits.org/
   * @see https://www.npmjs.com/package/@commitlint/config-conventional
   * @see https://www.npmjs.com/package/@commitlint/config-lerna-scopes
   *
   * @property {Array<string>} extends
   */
  extends: [
    '@commitlint/config-conventional',
    '@commitlint/config-lerna-scopes'
  ],

  /**
   * Resolveable id to package, from node_modules, which formats the output.
   *
   * @property {string} formatter
   */
  formatter: '@commitlint/format',

  /**
   * Functions that return true if commitlint should ignore the given message.
   *
   * If {@param commit} includes `wip:` the commit message will be ignored.
   *
   * @param {string} commit - The commit message
   * @return {boolean} True if message should be ignored
   */
  ignores: [commit => commit.startsWith('wip:')],

  /**
   * Rules to check against.
   *
   * @see https://commitlint.js.org/#/reference-rules
   *
   * @property {Record<string, Rule>} rules
   */
  rules: {
    /**
     * Scope syntax.
     */
    'scope-case': [2, 'always', 'kebab-case'],

    /**
     * Returns the rules for valid commit scopes.
     *
     * Valid scopes include the name of each package (not including scope), as
     * well as `deps` and `release`.
     *
     * @param {object} ctx - Commitlint context
     * @return {Rule} Scope rules
     */
    'scope-enum': async ctx => [
      2,
      'always',
      [...(await utils.getPackages(ctx)), 'deps', 'release']
    ]
  }
}
