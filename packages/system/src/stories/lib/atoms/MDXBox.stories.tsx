import { MDXBox, MDXBoxProps } from '@system/components'
import { StoryFN } from '@system/types/storybook'
import React from 'react'

/**
 * @file Stories - MDXBox
 * @module stories/lib/atoms/MDXBox
 */

export default {
  component: MDXBox,
  parameters: {
    jest: ['MDXBox']
  },
  title: 'Library/Atoms/MDXBox'
}

export const MarkdownMDX: StoryFN<MDXBoxProps> = (args: MDXBoxProps) => (
  <MDXBox {...args} />
)

MarkdownMDX.args = {
  children: `**Hello, World**\n<Button>${MDXBox.displayName}</Button>`
}

export const PureMarkdown: StoryFN<MDXBoxProps> = (args: MDXBoxProps) => (
  <MDXBox {...args} />
)

PureMarkdown.args = {
  children: '## Hello, World'
}

export const PureMDX: StoryFN<MDXBoxProps> = (args: MDXBoxProps) => (
  <MDXBox {...args} />
)

PureMDX.args = {
  children: `<Section><Container fluid><Heading size={2}>${MDXBox.displayName}</Heading><Paragraph mb={72}>Ramps fixie flexitarian locavore man bun shabby chic. Lyft asymmetrical forage mumblecore, kombucha copper mug snackwave selfies offal pork belly activated charcoal tacos. Pop-up wolf 3 wolf moon truffaut umami scenester mlkshk bespoke aesthetic whatever tousled drinking vinegar fanny pack iPhone.</Paragraph></Container></Section>`
}
