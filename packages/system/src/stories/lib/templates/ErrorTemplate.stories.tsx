import {
  ErrorTemplate,
  ErrorTemplateProps,
  Link,
  Paragraph
} from '@system/components'
import { StoryFN } from '@system/types/storybook'
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
  children: (
    <Paragraph c='white'>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      Go <Link c='secondary'>home</Link> and smoke or something.
    </Paragraph>
  ),
  code: 404,
  message: "Sorry, the page you're looking for does not exist."
}
