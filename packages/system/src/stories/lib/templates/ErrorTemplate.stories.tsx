import { ErrorTemplate, ErrorTemplateProps } from '@system/components'
import { StoryFN } from '@system/types'
import React from 'react'

/**
 * @file Stories - ErrorTemplate
 * @module stories/lib/templates/ErrorTemplate
 */

export default {
  component: ErrorTemplate,
  parameters: {
    jest: ['ErrorTemplate']
  },
  title: 'Library/Templates/ErrorTemplate'
}

export const NotFound: StoryFN<ErrorTemplateProps> = (
  args: ErrorTemplateProps
) => <ErrorTemplate {...args} />

NotFound.storyName = '404'
NotFound.args = {
  code: 404,
  message: 'Page with slug "/about" not found.'
}
