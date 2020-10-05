import { StoryFN } from '@kustomz-config/index'
import { Option, OptionProps } from '@kustomz/lib'
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
