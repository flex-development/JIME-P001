import { Heading, HeadingProps } from '@kustomz/lib'
import React from 'react'
import { StoryFN } from '../../../config'

/**
 * @file Stories - Heading
 * @module stories/lib/atoms/Heading
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