import { withConsole } from '@storybook/addon-console'
import { DocsContainer } from '@storybook/addon-docs/blocks'
import { withTests } from '@storybook/addon-jest'
import prettier from '../../../.prettierrc.js'
import { CartContextProvider } from '../src/providers'
import '../src/scss/index.scss'
import results from '../__tests__/results.json'
import ITEMS from '../__tests__/__mocks__/data/checkout-line-items.mock.json'
import { Documentation } from './components'
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

export const decorators = [
  // Add Jest output to stories
  withTests({ results }),

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
