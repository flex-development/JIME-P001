import { NativeOption, NativeSelect, NativeSelectProps } from '@kustomz'
import { StoryFN } from '@kustomz-config'
import React from 'react'

/**
 * @file Stories - Select
 * @module stories/lib/elements/Select
 */

export default {
  component: NativeSelect,
  subcomponents: { NativeOption },
  title: 'Elements/Select'
}

/**
 * Native {@link Select} story.
 */
export const Native: StoryFN<NativeSelectProps> = (args: NativeSelectProps) => (
  <NativeSelect {...args} />
)

Native.args = {
  options: [
    {
      children: 'Ketchup',
      label: 'Ketchup',
      value: 'ketchup'
    },
    {
      children: 'Mustard',
      label: 'Mustard',
      selected: true,
      value: 'mustard'
    },
    {
      children: 'Relish',
      label: 'Relish',
      value: 'relish'
    }
  ]
}
