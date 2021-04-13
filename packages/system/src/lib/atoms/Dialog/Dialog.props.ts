import type { ComponentPropsBase } from '@system/types'

/**
 * @file Component Props - Dialog
 * @module lib/atoms/Dialog
 */

export interface DialogProps extends ComponentPropsBase<'dialog'> {
  /**
   * Indicates that the dialog is active and can be interacted with.
   *
   * When this attribute is not set, the dialog shouldn't be shown to the user.
   *
   * Notes:
   *
   * - `<form>` elements can close dialogs with `method='dialog'`
   */
  open?: boolean
}
