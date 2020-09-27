import { color, size, StoryFN } from '@kustomz-config'
import { Option, OptionProps } from '@kustomz/lib'
import React from 'react'

/**
 * @file Stories - Option
 * @module stories/lib/elements/Option
 */

export default {
  argTypes: { color, size },
  component: Option,
  title: 'Elements/Option'
}

/**
 * Native {@link Option} story.
 */
export const Native: StoryFN<OptionProps> = (args: OptionProps) => (
  <Option {...args} />
)

Native.args = {
  label: 'Option label'
}
