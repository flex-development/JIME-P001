import { color, size, StoryFN } from '@kustomz-config'
import { Label, LabelProps } from '@kustomz/lib'
import React from 'react'

/**
 * @file Stories - Label
 * @module stories/lib/atoms/Label
 */

export default {
  argTypes: { color, size },
  component: Label,
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
