import { color, size, StoryFN, variant } from '@kustomz-config'
import { Paragraph, ParagraphProps } from '@kustomz/lib'
import React from 'react'

/**
 * @file Stories - Paragraph
 * @module stories/lib/atoms/Paragraph
 */

export default {
  argTypes: { color, size, variant },
  component: Paragraph,
  title: 'Library/Atoms/Paragraph'
}

/**
 * Default {@link Paragraph} story.
 */
export const Default: StoryFN<ParagraphProps> = (args: ParagraphProps) => (
  <Paragraph {...args} />
)

Default.args = {}

/**
 * {@link Form} {@link Paragraph} story.
 */
export const Form: StoryFN<ParagraphProps> = (args: ParagraphProps) => (
  <Paragraph {...args} />
)

Form.args = {
  children:
    'Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.',
  form: true
}