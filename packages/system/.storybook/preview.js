import { withConsole } from '@storybook/addon-console'
import { DocsContainer } from '@storybook/addon-docs/blocks'
import { withTests } from '@storybook/addon-jest'
import prettier from '../../../.prettierrc.js'
import { CartContextProvider } from '../src/providers'
import '../src/scss/index.scss'
import results from '../__tests__/results.json'
import { ITEMS } from '../__tests__/utils'
import { Documentation } from './components'
import formatAssertionResultNames from './config/formatAssertionResultNames'
import { AdobeXDArtboards } from './config/viewports'

/**
 * @file Storybook Preview Configuration
 * @module storybook/preview
 */

export const parameters = {
  a11y: {},
  actions: { argTypesRegex: '^(handle|on).*' },
  backgrounds: {
    default: 'Light',
    values: [
      { name: 'Dark', value: 'var(--mk-dark)' },
      { name: 'Light', value: 'var(--mk-light)' },
      { name: 'Primary', value: 'var(--mk-primary)' },
      { name: 'Secondary', value: 'var(--mk-secondary)' }
    ]
  },
  controls: { expanded: false },
  docs: { container: DocsContainer, page: Documentation },
  html: {
    highlighter: {
      showLineNumbers: true
    },
    prettier
  },
  viewport: { viewports: AdobeXDArtboards }
}

const testname = 'e2e|integration|unit'

export const decorators = [
  // Add Jest output to stories
  withTests({
    filesExt: `((.spec?)?(.tsx?)|(/__tests__/(${testname}).spec.tsx?))?$`,
    results: formatAssertionResultNames(results)
  }),

  // Receive console outputs as a console, warn and error in the actions panel
  (Story, context) => {
    return withConsole({
      consoleInclude: [new URLSearchParams(window.location.search).get('id')]
    })(Story)(context)
  },

  // Add provider components
  Story => (
    <CartContextProvider items={ITEMS}>
      <Story />
    </CartContextProvider>
  )
]
