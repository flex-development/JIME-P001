import { Option, OptionProps } from '@system/components'
import { StoryFN } from '@system/types'
import React from 'react'

/**
 * @file Stories - Option
 * @module stories/lib/atoms/Option
 */

export default {
  component: Option,
  parameters: {
    jest: ['Option']
  },
  title: 'Library/Atoms/Option'
}

/**
 * Default {@link Option} story.
 */
export const Default: StoryFN<OptionProps> = (args: OptionProps) => (
  <Option {...args} />
)

Default.args = {
  label: 'Option label'
}
