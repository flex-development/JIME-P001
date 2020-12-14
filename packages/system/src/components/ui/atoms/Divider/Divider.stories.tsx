import { StoryFN } from '@system/types/storybook'
import { Divider, DividerProps } from './Divider'

/**
 * @file Stories - Divider
 * @module components/ui/atoms/Divider/stories
 */

export default {
  component: Divider,
  parameters: {
    jest: ['Divider']
  },
  title: 'Library/Atoms/Divider'
}

export const Default: StoryFN<DividerProps> = (args: DividerProps) => (
  <Divider {...args} />
)

Default.args = {}
