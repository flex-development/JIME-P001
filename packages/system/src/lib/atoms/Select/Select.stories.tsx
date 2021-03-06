import { Option } from '../Option'
import { Select } from './Select'
import type { SelectProps } from './Select.props'

/**
 * @file Stories - Select
 * @module lib/atoms/Select/stories
 */

export default {
  component: Select,
  parameters: {
    jest: ['Select']
  },
  subcomponents: { Option },
  title: 'Library/Atoms/Select'
}

export const Form: FCS<SelectProps> = args => <Select {...args} />

Form.args = {
  $options: [
    {
      label: 'Option 1',
      value: 1
    },
    {
      label: 'Option 2',
      value: 2
    },
    {
      label: 'Option 3',
      value: 3
    }
  ]
}
