import { Divider, DividerProps } from '@kustomz/lib'
import React from 'react'
import { StoryFN } from '../../../config'

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
