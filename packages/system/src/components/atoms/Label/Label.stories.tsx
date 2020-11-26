import { StoryFN } from '@system/types/storybook'
import React from 'react'
import { Label, LabelProps } from './Label'

/**
 * @file Stories - Label
 * @module components/atoms/Label/stories
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
