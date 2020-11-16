import { Dialog, DialogProps } from '@system/components'
import { StoryFN } from '@system/types/storybook'
import React from 'react'

/**
 * @file Stories - Dialog
 * @module stories/lib/atoms/Dialog
 */

export default {
  component: Dialog,
  parameters: {
    jest: ['Dialog']
  },
  title: 'Library/Atoms/Dialog'
}

export const Default: StoryFN<DialogProps> = (args: DialogProps) => (
  <Dialog {...args} />
)

Default.args = {
  children: 'Hello, World',
  open: true
}
