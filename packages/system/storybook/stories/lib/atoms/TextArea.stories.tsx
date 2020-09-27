import { TextArea, TextAreaProps } from '@kustomz/lib'
import React from 'react'
import {
  form_control_size as size,
  StoryFN
} from '../../../config'

/**
 * @file Stories - TextArea
 * @module stories/lib/atoms/TextArea
 */

export default {
  argTypes: { size },
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
