import { StoryFN } from '@kustomz-config'
import { TextArea, TextAreaProps } from '@kustomz/lib'
import React from 'react'

/**
 * @file Stories - TextArea
 * @module stories/lib/atoms/TextArea
 */

export default {
  component: TextArea,
  title: 'Library/Atoms/TextArea'
}

/**
 * Default {@link TextArea} story.
 */
export const Default: StoryFN<TextAreaProps> = (args: TextAreaProps) => (
  <TextArea {...args} />
)

Default.args = {}
