import { Dialog } from './Dialog'
import type { DialogProps } from './Dialog.props'

/**
 * @file Stories - Dialog
 * @module lib/atoms/Dialog/stories
 */

export default {
  component: Dialog,
  parameters: {
    jest: ['Dialog']
  },
  title: 'Library/Atoms/Dialog'
}

export const Open: FCS<DialogProps> = args => <Dialog {...args} />

Open.args = {
  children: 'Hello, World',
  open: true
}
