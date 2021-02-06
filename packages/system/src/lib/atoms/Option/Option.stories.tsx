import { Option } from './Option'
import type { OptionProps } from './Option.props'

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

export const Form: FCS<OptionProps> = args => <Option {...args} />

Form.args = {
  label: 'Form option label'
}
