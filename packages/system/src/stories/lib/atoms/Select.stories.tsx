import { Option, Select, SelectProps } from '@system/components'
import { StoryFN } from '@system/types/storybook'
import React from 'react'

/**
 * @file Stories - Select
 * @module stories/lib/atoms/Select
 */

export default {
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
  options: [
    {
      label: 'Option 1',
      value: 1
    },
    {
      label: 'Option 2',
      value: 2
    },
    {
      label: 'Option 3',
      value: 3
    }
  ]
}
