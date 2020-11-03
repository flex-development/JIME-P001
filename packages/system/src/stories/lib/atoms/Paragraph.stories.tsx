import { Paragraph, ParagraphProps } from '@system/components'
import { StoryFN } from '@system/types'
import React from 'react'

/**
 * @file Stories - Paragraph
 * @module stories/lib/atoms/Paragraph
 */

export default {
  component: Paragraph,
  parameters: {
    jest: ['Paragraph']
  },
  title: 'Library/Atoms/Paragraph'
}

/**
 * Default {@link Paragraph} story.
 */
export const Default: StoryFN<ParagraphProps> = (args: ParagraphProps) => (
  <Paragraph {...args} />
)

Default.args = {
  children:
    'The quick brown fox jumps over the lazy dog. How vexingly quick daft zebras jump! Sphinx of black quartz, judge my vow. The five boxing wizards jump quickly. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. Jived fox nymph grabs quick waltz. Glib jocks quiz nymph to vex dwarf.'
}

/**
 * {@link Form} {@link Paragraph} story.
 */
export const Form: StoryFN<ParagraphProps> = (args: ParagraphProps) => (
  <Paragraph {...args} />
)

Form.args = {
  children:
    'Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.',
  className: 'form-text'
}
