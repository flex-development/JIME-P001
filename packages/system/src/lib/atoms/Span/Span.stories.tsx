import { Span } from './Span'
import { SpanProps } from './Span.props'

/**
 * @file Stories - Span
 * @module lib/atoms/Span/stories
 */

export default {
  component: Span,
  parameters: {
    jest: ['Span']
  },
  title: 'Library/Atoms/Span'
}

export const Default: FCS<SpanProps> = args => <Span {...args} />

Default.args = {
  children: 'Span text'
}
