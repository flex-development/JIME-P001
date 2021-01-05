import { Heading } from './Heading'
import { HeadingProps } from './Heading.props'

/**
 * @file Stories - Heading
 * @module lib/atoms/Heading/stories
 */

export default {
  component: Heading,
  parameters: {
    jest: ['Heading']
  },
  title: 'Library/Atoms/Heading'
}

export const Default: FCS<HeadingProps> = args => <Heading {...args} />

Default.args = {
  children: 'The quick brown fox jumps over the lazy dog'
}
