import { PageTemplate, PageTemplateProps } from '@system/components'
import { StoryFN } from '@system/types'
import React from 'react'

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
  body: '## Hello, World'
}

export const MDX: StoryFN<PageTemplateProps> = (args: PageTemplateProps) => (
  <PageTemplate {...args} />
)

MDX.args = {
  body:
    '<Section><Container fluid><Heading size={2}>MDX Page</Heading><Paragraph mb={72}>Ramps fixie flexitarian locavore man bun shabby chic. Lyft asymmetrical forage mumblecore, kombucha copper mug snackwave selfies offal pork belly activated charcoal tacos. Pop-up wolf 3 wolf moon truffaut umami scenester mlkshk bespoke aesthetic whatever tousled drinking vinegar fanny pack iPhone.</Paragraph></Container></Section>'
}
