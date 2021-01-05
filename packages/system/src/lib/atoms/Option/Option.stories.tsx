import { Option } from './Option'
import { OptionProps } from './Option.props'

/**
 * @file Stories - Option
 * @module lib/atoms/Option/stories
 */

export default {
  component: Option,
  parameters: {
    jest: ['Option']
  },
  title: 'Library/Atoms/Option'
}

export const Default: FCS<OptionProps> = args => <Option {...args} />

Default.args = {
  label: 'Option label'
}

export const Form: FCS<OptionProps> = args => <Option {...args} />

Form.args = {
  $form: true,
  label: 'Form option'
}
