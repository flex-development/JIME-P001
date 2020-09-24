import { Divider, DividerProps } from '@kustomz'
import { StoryFN } from '@kustomz-config'
import React from 'react'

/**
 * @file Stories - Divider
 * @module stories/lib/elements/Divider
 */

export default {
  component: Divider,
  title: 'Elements/Divider'
}

export const Default: StoryFN<DividerProps> = (args: DividerProps) => (
  <Divider {...args} />
)

Default.args = {}
