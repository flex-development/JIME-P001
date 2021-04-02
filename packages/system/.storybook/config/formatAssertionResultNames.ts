import type { FormattedTestResults } from '@jest/test-result/build/types'
import debug from 'debug'
import join from 'lodash/join'

/**
 * @file Format Ancestor Titles for Storybook Addon Jest
 * @module config/formatAssertionResultNamess
 * @see https://github.com/storybookjs/storybook/tree/next/addons/jest
 */

const logger = debug('config/formatAssertionResultNames')

/**
 * Formats the `fullName` property of each test assertion result to improve
 * readability when reading tests from the Storybook Jest addon panel.
 *
 * Each assertion result will combine its `ancestorTitles` and `title` to
 * override the original `fullName` property.
 *
 * @param {FormattedTestResults} results - Jest test results JSON object
 * @param {string} [separator] - Title separator. Defaults to `|`
 * @return {FormattedTestResults} Updated results object
 */
const formatAssertionResultNames = (
  results: FormattedTestResults,
  separator: string = '|'
): FormattedTestResults => {
  // Do nothing if results object or test results array doesn't exist
  if (!results || !results.testResults || !results.testResults.length) {
    logger.log('No test results.')
    return results
  }

  // Map over test results
  results.testResults = results.testResults.map(test => {
    const { 1: component_from_lib } = test.name.split('/src/lib/')

    // Return original result if not working with component test
    if (!component_from_lib) return test

    // Format titles
    test.assertionResults = test.assertionResults.map(aresult => {
      const names = [...aresult.ancestorTitles, aresult.title]

      return {
        ...aresult,
        fullName: names.length === 1 ? names[0] : join(names, ` ${separator} `)
      }
    })

    // Return update test object
    return test
  })

  // Return updated formatted results object
  return results
}

export default formatAssertionResultNames
