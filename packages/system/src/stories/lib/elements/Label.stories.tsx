import {Label, LabelProps} from '@kustomz'
import {color, size, StoryFN} from '@kustomz-config'
import React from 'react'

/**
 * @file Stories - Label
 * @module stories/lib/elements/Label
 */

export default {
  argTypes: {color, size},
  component: Label,
  title: 'Elements/Label',
}

/**
 * Default {@link Label} story.
 */
export const Default: StoryFN<LabelProps> = (args: LabelProps) => (
  <Label {...args} />
)

Default.args = {
  children: 'Email address',
}
