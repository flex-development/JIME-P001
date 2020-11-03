import { TextArea, TextAreaProps } from '@system/components'
import { StoryFN } from '@system/types'
import React from 'react'

/**
 * @file Stories - TextArea
 * @module stories/lib/atoms/TextArea
 */

export default {
  component: TextArea,
  parameters: {
    jest: ['TextArea']
  },
  title: 'Library/Atoms/TextArea'
}

/**
 * Default {@link TextArea} story.
 */
export const Default: StoryFN<TextAreaProps> = (args: TextAreaProps) => (
  <TextArea {...args} />
)

Default.args = {
  placeholder: 'A hint to the user of what can be entered in the control'
}
