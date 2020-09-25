import { box_variant as variant, color, size, StoryFN } from '@kustomz-config'
import { Span, SpanProps } from '@kustomz/lib'
import React from 'react'

/**
 * @file Stories - Span
 * @module stories/lib/elements/Span
 */

export default {
  argTypes: { color, size, variant },
  component: Span,
  title: 'Elements/Span'
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
