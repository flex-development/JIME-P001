import { PageTemplate, PageTemplateProps } from '@system/components'
import { StoryFN } from '@system/types'
import React from 'react'
import { PureMarkdown, PureMDX } from '../atoms/MDXBox.stories'

/**
 * @file Stories - PageTemplate
 * @module stories/lib/templates/PageTemplate
 */

export default {
  args: {
    style: {
      maxWidth: '1410px'
    }
  },
  component: PageTemplate,
  parameters: {
    jest: ['PageTemplate']
  },
  title: 'Library/Templates/PageTemplate'
}

export const Markdown: StoryFN<PageTemplateProps> = (
  args: PageTemplateProps
) => <PageTemplate {...args} />

Markdown.args = {
  body: PureMarkdown.args.children
}

export const MDX: StoryFN<PageTemplateProps> = (args: PageTemplateProps) => (
  <PageTemplate {...args} />
)

MDX.args = {
  body: PureMDX.args.children
}
