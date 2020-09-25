import { color, StoryFN } from '@kustomz-config'
import { Heading, HeadingProps } from '@kustomz/lib'
import React from 'react'

/**
 * @file Stories - Heading
 * @module stories/lib/elements/Heading
 */

export default {
  argTypes: { color },
  component: Heading,
  title: 'Elements/Heading'
}

/**
 * Default {@link Heading} story.
 */
export const Default: StoryFN<HeadingProps> = (args: HeadingProps) => (
  <Heading {...args} />
)

Default.args = {}
