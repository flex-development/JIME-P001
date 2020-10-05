import { StoryFN } from '@kustomz-config/index'
import { Label, LabelProps } from '@kustomz/lib'
import React from 'react'

/**
 * @file Stories - Label
 * @module stories/lib/atoms/Label
 */

export default {
  component: Label,
  parameters: {
    jest: ['Label']
  },
  title: 'Library/Atoms/Label'
}

/**
 * Default {@link Label} story.
 */
export const Default: StoryFN<LabelProps> = (args: LabelProps) => (
  <Label {...args} htmlFor='#' />
)

Default.args = {
  children: 'Email address'
}
