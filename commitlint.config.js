const { utils } = require('@commitlint/config-lerna-scopes')
const { Rule, RuleConfigTuple } = require('@commitlint/types')
const { AnyObject } = require('@flex-development/json')
const { Record } = require('typescript')

/**
 * @file Commitlint Configuration
 * @see https://commitlint.js.org/#/guides-local-setup
 * @see https://www.conventionalcommits.org/en/v1.0.0/#specification
 */

module.exports = {
  /**
   * @property {boolean} defaultIgnores - If true, enable default ignore rules
   */
  defaultIgnores: true,

  /**
   * @property {Array<string>} extends - IDs of commitlint configurations
   *
   * @see https://www.conventionalcommits.org/
   * @see https://www.npmjs.com/package/@commitlint/config-conventional
   * @see https://www.npmjs.com/package/@commitlint/config-lerna-scopes
   */
  extends: [
    '@commitlint/config-conventional',
    '@commitlint/config-lerna-scopes'
  ],

  /**
   * @property {string} formatter - Name of formatter package
   */
  formatter: '@commitlint/format',

  /**
   * Functions that return true if commitlint should ignore the given message.
   *
   * @param {string} commit - The commit message
   * @return {boolean} `true` if commitlint should ignore message
   */
  ignores: [
    /**
     * Ignores commit messages that start with `wip:`.
     *
     * @param {string} commit - The commit message
     * @return {boolean} True if message begins with `wip:`
     */
    commit => commit.startsWith('wip:'),

    /**
     * Ignores commit messages that start with the phrase "GET /" or "POST /"
     * after the type and/or scope.
     *
     * Used when testing endpoints from the `api` package.
     *
     * @param {string} commit - The commit message
     * @return {boolean} True if message begins with 'wip:'
     */
    commit => {
      const start = commit.split(': ')[1]
      return start.startsWith('GET /') || start.startsWith('POST /')
    }
  ],

  /**
   * @property {Record<string, Rule>} rules - Rules to check against
   *
   * @see https://commitlint.js.org/#/reference-rules
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
     * @param {AnyObject} ctx - Environment context
     * @return {Promise<RuleConfigTuple>} Scope rules
     */
    'scope-enum': async ctx => [
      2,
      'always',
      [...(await utils.getPackages(ctx)), 'deps', 'release']
    ]
  }
}
