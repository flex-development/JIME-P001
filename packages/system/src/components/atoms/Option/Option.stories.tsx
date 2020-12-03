import { StoryFN } from '@system/types/storybook'
import { Option, OptionProps } from './Option'

/**
 * @file Stories - Option
 * @module components/atoms/Option/stories
 */

export default {
  component: Option,
  parameters: {
    jest: ['Option']
  },
  title: 'Library/Atoms/Option'
}

/**
 * Default {@link Option} story.
 */
export const Default: StoryFN<OptionProps> = (args: OptionProps) => (
  <Option {...args} />
)

Default.args = {
  label: 'Option label'
}
