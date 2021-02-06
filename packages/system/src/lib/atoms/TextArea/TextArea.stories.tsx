import { TextArea } from './TextArea'
import type { TextAreaProps } from './TextArea.props'

/**
 * @file Stories - TextArea
 * @module lib/atoms/TextArea/stories
 */

export default {
  component: TextArea,
  parameters: {
    jest: ['TextArea']
  },
  title: 'Library/Atoms/TextArea'
}

export const Form: FCS<TextAreaProps> = args => <TextArea {...args} />

Form.args = {
  placeholder: 'A hint to the user of what can be entered in the control'
}
