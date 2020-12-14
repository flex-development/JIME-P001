import { StoryFN } from '@system/types/storybook'
import { Option } from '../Option'
import { Select, SelectProps } from './Select'

/**
 * @file Stories - Select
 * @module components/ui/atoms/Select/stories
 */

export default {
  component: Select,
  parameters: {
    jest: ['Select']
  },
  subcomponents: { Option },
  title: 'Library/Atoms/Select'
}

/**
 * Default {@link Select} story.
 */
export const Default: StoryFN<SelectProps> = (args: SelectProps) => (
  <Select {...args} />
)

Default.args = {
  options: [
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
