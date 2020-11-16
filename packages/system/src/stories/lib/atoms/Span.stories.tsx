import { Span, SpanProps } from '@system/components'
import { StoryFN } from '@system/types/storybook'
import React from 'react'

/**
 * @file Stories - Span
 * @module stories/lib/atoms/Span
 */

export default {
  component: Span,
  parameters: {
    jest: ['Span']
  },
  title: 'Library/Atoms/Span'
}

/**
 * Default {@link Span} story.
 */
export const Default: StoryFN<SpanProps> = (args: SpanProps) => (
  <Span {...args} />
)

Default.args = {
  children: 'Span text'
}
