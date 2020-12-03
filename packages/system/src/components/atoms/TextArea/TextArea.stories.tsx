import { StoryFN } from '@system/types/storybook'
import { TextArea, TextAreaProps } from './TextArea'

/**
 * @file Stories - TextArea
 * @module components/atoms/TextArea/stories
 */

export default {
  component: TextArea,
  parameters: {
    jest: ['TextArea']
  },
  title: 'Library/Atoms/TextArea'
}

/**
 * Default {@link TextArea} story.
 */
export const Default: StoryFN<TextAreaProps> = (args: TextAreaProps) => (
  <TextArea {...args} />
)

Default.args = {
  placeholder: 'A hint to the user of what can be entered in the control'
}
