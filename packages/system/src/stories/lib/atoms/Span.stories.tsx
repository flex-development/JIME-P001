import { Span, SpanProps } from '@kustomz/lib'
import React from 'react'
import { StoryFN, variant } from '../../../../.storybook/config'

/**
 * @file Stories - Span
 * @module stories/lib/atoms/Span
 */

export default {
  argTypes: { variant },
  component: Span,
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
