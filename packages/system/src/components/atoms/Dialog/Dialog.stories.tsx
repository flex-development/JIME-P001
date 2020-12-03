import { StoryFN } from '@system/types/storybook'
import { Dialog, DialogProps } from './Dialog'

/**
 * @file Stories - Dialog
 * @module components/atoms/Dialog/stories
 */

export default {
  component: Dialog,
  parameters: {
    jest: ['Dialog']
  },
  title: 'Library/Atoms/Dialog'
}

export const Default: StoryFN<DialogProps> = (args: DialogProps) => (
  <Dialog {...args} />
)

Default.args = {
  children: 'Hello, World',
  open: true
}
