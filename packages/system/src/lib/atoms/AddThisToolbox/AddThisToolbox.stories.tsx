import { AddThisToolbox } from './AddThisToolbox'
import type { AddThisToolboxProps } from './AddThisToolbox.props'

/**
 * @file Stories - AddThisToolbox
 * @module lib/atoms/AddThisToolbox/stories
 */

export default {
  component: AddThisToolbox,
  parameters: {
    jest: ['AddThisToolbox']
  },
  title: 'Library/Atoms/AddThisToolbox'
}

export const InlineFollow: FCS<AddThisToolboxProps> = args => (
  <AddThisToolbox {...args} />
)

InlineFollow.args = {
  type: 'inline_follow'
}

export const InlineShare: FCS<AddThisToolboxProps> = args => (
  <AddThisToolbox {...args} />
)

InlineShare.args = {}
