import { Label, LabelProps } from '@kustomz/lib'
import React from 'react'
import { StoryFN } from '../../../config'

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
  <Label {...args} />
)

Default.args = {
  children: 'Email address'
}
