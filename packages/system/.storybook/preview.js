import { withConsole } from '@storybook/addon-console'
import { DocsContainer } from '@storybook/addon-docs/blocks'
import { withTests } from '@storybook/addon-jest'
import { withHTML } from '@whitespace/storybook-addon-html/react'
import prettier from '../../../.prettierrc.json'
import { AdobeXDArtboards } from '../src/config'
import '../src/theme/theme.scss'
import { getThemeColor } from '../src/utils'
import results from '../__tests__/jest-test-results.json'
import { Documentation } from './components'

/**
 * @file Storybook Configuration
 * @module storybook/preview
 */

export const parameters = {
  a11y: {},
  actions: { argTypesRegex: ['^handle.*', '^on.*'] },
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
  withHTML({ prettier }),

  // Add Jest output to stories
  withTests({ results })
]
