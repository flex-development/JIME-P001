import { StoryFN } from '@kustomz-config'
import { Divider, DividerProps } from '@kustomz/lib'
import React from 'react'

/**
 * @file Stories - Divider
 * @module stories/lib/atoms/Divider
 */

export default {
  component: Divider,
  title: 'Library/Atoms/Divider'
}

export const Default: StoryFN<DividerProps> = (args: DividerProps) => (
  <Divider {...args} />
)

Default.args = {}
