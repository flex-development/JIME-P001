import { Divider } from './Divider'
import type { DividerProps } from './Divider.props'

/**
 * @file Stories - Divider
 * @module lib/atoms/Divider/stories
 */

export default {
  component: Divider,
  parameters: {
    jest: ['Divider']
  },
  title: 'Library/Atoms/Divider'
}

export const Default: FCS<DividerProps> = args => <Divider {...args} />

Default.args = {}
