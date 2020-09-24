import { NativeOption, NativeOptionProps } from '@kustomz'
import { color, size, StoryFN } from '@kustomz-config'
import React from 'react'

/**
 * @file Stories - Option
 * @module stories/lib/elements/Option
 */

export default {
  argTypes: { color, size },
  component: NativeOption,
  title: 'Elements/Option'
}

/**
 * Native {@link Option} story.
 */
export const Native: StoryFN<NativeOptionProps> = (args: NativeOptionProps) => (
  <NativeOption {...args} />
)

Native.args = {
  label: 'Option label'
}
