import { StoryFN } from '@kustomz-config/index'
import { Divider, DividerProps } from '@kustomz/lib'
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
