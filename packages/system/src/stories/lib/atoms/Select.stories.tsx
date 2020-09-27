import { StoryFN } from '@kustomz-config'
import { Option, Select, SelectProps } from '@kustomz/lib'
import React from 'react'

/**
 * @file Stories - Select
 * @module stories/lib/atoms/Select
 */

export default {
  component: Select,
  subcomponents: { Option },
  title: 'Library/Atoms/Select'
}

/**
 * Native {@link Select} story.
 */
export const Native: StoryFN<SelectProps> = (args: SelectProps) => (
  <Select {...args} />
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
