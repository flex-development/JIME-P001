import { StoryFN } from '@system/types/storybook'
import { Label, LabelProps } from './Label'

/**
 * @file Stories - Label
 * @module components/ui/atoms/Label/stories
 */

export default {
  component: Label,
  parameters: {
    jest: ['Label']
  },
  title: 'Library/Atoms/Label'
}

/**
 * Default {@link Label} story.
 */
export const Default: StoryFN<LabelProps> = (args: LabelProps) => (
  <Label {...args} htmlFor='#' />
)

Default.args = {
  children: 'Email address'
}