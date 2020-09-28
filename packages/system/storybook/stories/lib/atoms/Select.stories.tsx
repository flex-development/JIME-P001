import { Option, Select, SelectProps } from '@kustomz/lib'
import React from 'react'
import { form_control_size as size, StoryFN } from '../../../config'

/**
 * @file Stories - Select
 * @module stories/lib/atoms/Select
 */

export default {
  argTypes: { size },
  component: Select,
  parameters: {
    jest: ['Select']
  },
  subcomponents: { Option },
  title: 'Library/Atoms/Select'
}

/**
 * Default {@link Select} story.
 */
export const Default: StoryFN<SelectProps> = (args: SelectProps) => (
  <Select {...args} />
)

Default.args = {
  defaultValue: 'mustard',
  options: [
    {
      children: 'Ketchup',
      label: 'Ketchup',
      value: 'ketchup'
    },
    {
      children: 'Mustard',
      label: 'Mustard',
      value: 'mustard'
    },
    {
      children: 'Relish',
      label: 'Relish',
      value: 'relish'
    }
  ]
}
