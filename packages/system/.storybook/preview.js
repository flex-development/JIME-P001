import { withConsole } from '@storybook/addon-console'
import { DocsContainer } from '@storybook/addon-docs/blocks'
import { omit } from 'lodash'
import React from 'react'
import '../src/theme/theme.scss'
import {
  AdobeXDArtboards,
  Documentation,
  excludePropKeys,
  getThemeColor
} from './config'

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
  // Remove extraneous keys from story context
  (Story, context) => {
    context.args = omit(context.args, excludePropKeys)
    context.argTypes = omit(context.argTypes, excludePropKeys)

    context.parameters.args = context.args
    context.parameters.argTypes = context.argTypes

    return <>{Story(context)}</>
  },

  // Receive console outputs as a console, warn and error in the actions panel
  (Story, context) => {
    return withConsole({
      consoleInclude: [new URLSearchParams(window.location.search).get('id')]
    })(Story)(context)
  }
]
