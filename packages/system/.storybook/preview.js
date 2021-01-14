import { withConsole } from '@storybook/addon-console'
import { DocsContainer } from '@storybook/addon-docs/blocks'
import { withTests } from '@storybook/addon-jest'
import { withHTML } from '@whitespace/storybook-addon-html/react'
import prettier from '../../../.prettierrc.js'
import { CartContextProvider } from '../src/providers'
import '../src/scss/index.scss'
import results from '../__tests__/jest-test-results.json'
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
    default: 'Dark',
    values: [
      { name: 'Dark', value: 'var(--mk-dark)' },
      { name: 'Darker', value: 'var(--mk-darker)' },
      { name: 'Light', value: 'var(--mk-light)' },
      { name: 'Primary', value: 'var(--mk-primary)' },
      { name: 'Secondary', value: 'var(--mk-secondary)' }
    ]
  },
  controls: { expanded: false },
  docs: { container: DocsContainer, page: Documentation },
  viewport: { viewports: AdobeXDArtboards }
}

export const decorators = [
  // Add provider components
  Story => (
    <CartContextProvider items={ITEMS}>
      <Story />
    </CartContextProvider>
  ),

  // Receive console outputs as a console, warn and error in the actions panel
  (Story, context) => {
    return withConsole({
      consoleInclude: [new URLSearchParams(window.location.search).get('id')]
    })(Story)(context)
  },

  // Display compiled HTML for each story and format with Prettier
  withHTML({ prettier }),

  // Add Jest output to stories
  withTests({ results })
]
