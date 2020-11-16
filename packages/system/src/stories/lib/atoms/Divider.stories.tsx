import { Divider, DividerProps } from '@system/components'
import { StoryFN } from '@system/types/storybook'
import React from 'react'

/**
 * @file Stories - Divider
 * @module stories/lib/atoms/Divider
 */

export default {
  component: Divider,
  parameters: {
    jest: ['Divider']
  },
  title: 'Library/Atoms/Divider'
}

export const Default: StoryFN<DividerProps> = (args: DividerProps) => (
  <Divider {...args} />
)

Default.args = {}
