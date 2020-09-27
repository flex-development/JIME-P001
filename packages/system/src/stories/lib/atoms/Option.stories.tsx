import { StoryFN } from '@kustomz-config'
import { Option, OptionProps } from '@kustomz/lib'
import React from 'react'

/**
 * @file Stories - Option
 * @module stories/lib/atoms/Option
 */

export default {
  component: Option,
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
