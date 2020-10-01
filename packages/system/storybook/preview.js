import { withConsole } from '@storybook/addon-console'
import { DocsContainer } from '@storybook/addon-docs/blocks'
import { withTests } from '@storybook/addon-jest'
import { withHTML } from '@whitespace/storybook-addon-html/react'
import '../src/theme/theme.scss'
import results from '../__tests__/jest-test-results.json'
import { AdobeXDArtboards, Documentation, getThemeColor } from './config'

/**
 * @file Storybook Configuration
 */

export const parameters = {
  a11y: {},
  actions: { argTypesRegex: '^on.*' },
  backgrounds: {
    default: 'Dark',
    values: [
      getThemeColor('dark', false),
      getThemeColor('darker', false),
      getThemeColor('light', false),
      getThemeColor('primary', false),
      getThemeColor('secondary', false)
    ]
  },
  controls: { expanded: false },
  docs: {
    container: DocsContainer,
    page: Documentation
  },
  viewport: { viewports: AdobeXDArtboards }
}

export const decorators = [
  // Receive console outputs as a console, warn and error in the actions panel
  (Story, context) => {
    return withConsole({
      consoleInclude: [new URLSearchParams(window.location.search).get('id')]
    })(Story)(context)
  },

  // Display compiled HTML for each story and format with Prettier
  withHTML({
    prettier: {
      arrowParens: 'avoid',
      bracketSpacing: true,
      htmlWhitespaceSensitivity: 'css',
      jsxBracketSameLine: false,
      jsxSingleQuote: true,
      printWidth: 80,
      proseWrap: 'always',
      quoteProps: 'as-needed',
      semi: false,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: 'none'
    }
  }),

  // Add Jest output to stories
  withTests({ results })
]
