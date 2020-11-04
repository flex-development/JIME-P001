import { useMutatedProps } from '@system/hooks'
import { MutatedProps } from '@system/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'

/**
 * @file Render a `<dialog>` element
 * @module components/atoms/Dialog
 */

export interface DialogProps
  extends Omit<MutatedProps<HTMLDialogElement>, 'tabindex'> {
  /**
   * Indicates that the dialog is active and can be interacted with. When this
   * attribute is not set, the dialog shouldn't be shown to the user.
   *
   * Notes:
   *
   * - `<form>` elements can close a dialog if they have the attribute
   *   `method='dialog'`
   *
   * @default true
   */
  open?: boolean
}

/**
 * Dialog component properties without the `ref` property.
 */
export type ReflessDialogProps = PropsWithoutRef<DialogProps>

/**
 * Ref attributes for `<dialog>` elements.
 */
export type DialogRefAttributes = RefAttributes<HTMLDialogElement>

/**
 * {@link Dialog} component forward ref properties.
 */
export type DialogRefProps = ReflessDialogProps & DialogRefAttributes

/**
 * Renders a `<dialog>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/dialog
 * - https://developer.mozilla.org/docs/Web/API/HTMLDialogElement
 */
export const Dialog: FREC<DialogRefProps> = forwardRef((props, ref) => {
  const mutated = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['dialog']
  >(props)

  return <dialog {...mutated} ref={ref} />
})

Dialog.displayName = 'Dialog'

Dialog.defaultProps = {
  open: false
}
