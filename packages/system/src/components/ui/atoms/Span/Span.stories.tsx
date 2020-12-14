import { StoryFN } from '@system/types/storybook'
import { Span, SpanProps } from './Span'

/**
 * @file Stories - Span
 * @module components/ui/atoms/Span/stories
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
