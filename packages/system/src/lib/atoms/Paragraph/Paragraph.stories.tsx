import { Paragraph } from './Paragraph'
import type { ParagraphProps } from './Paragraph.props'

/**
 * @file Stories - Paragraph
 * @module lib/atoms/Paragraph/stories
 */

export default {
  component: Paragraph,
  parameters: {
    jest: ['Paragraph']
  },
  title: 'Library/Atoms/Paragraph'
}

export const Default: FCS<ParagraphProps> = args => <Paragraph {...args} />

Default.args = {
  children:
    'The quick brown fox jumps over the lazy dog. How vexingly quick daft zebras jump! Sphinx of black quartz, judge my vow. The five boxing wizards jump quickly. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. Jived fox nymph grabs quick waltz. Glib jocks quiz nymph to vex dwarf.'
}

export const Form: FCS<ParagraphProps> = args => <Paragraph {...args} />

Form.args = {
  $form: true,
  children:
    'Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.'
}
