import { TextArea } from './TextArea'
import { TextAreaProps } from './TextArea.props'

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

export const Default: FCS<TextAreaProps> = args => <TextArea {...args} />

Default.args = {
  placeholder: 'A hint to the user of what can be entered in the control'
}

export const Form: FCS<TextAreaProps> = args => <TextArea {...args} />

Form.args = {
  $form: true,
  placeholder: Default.args.placeholder
}
