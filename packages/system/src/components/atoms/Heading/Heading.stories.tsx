import { StoryFN } from '@system/types/storybook'
import React from 'react'
import { Heading, HeadingProps } from './Heading'

/**
 * @file Stories - Heading
 * @module components/atoms/Heading/stories
 */

export default {
  component: Heading,
  parameters: {
    jest: ['Heading']
  },
  title: 'Library/Atoms/Heading'
}

/**
 * Default {@link Heading} story.
 */
export const Default: StoryFN<HeadingProps> = (args: HeadingProps) => (
  <Heading {...args} />
)

Default.args = {
  children: 'The quick brown fox jumps over the lazy dog'
}
