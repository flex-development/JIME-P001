import {TextArea, TextAreaProps} from '@kustomz'
import {StoryFN} from '@kustomz-config'
import React from 'react'

/**
 * @file Stories - TextArea
 * @module stories/lib/elements/TextArea
 */

export default {
  component: TextArea,
  title: 'Elements/TextArea',
}

/**
 * Default {@link TextArea} story.
 */
export const Default: StoryFN<TextAreaProps> = (args: TextAreaProps) => (
  <TextArea {...args} />
)

Default.args = {}
