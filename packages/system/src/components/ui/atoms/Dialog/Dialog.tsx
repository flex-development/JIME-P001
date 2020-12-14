import { useSanitizedProps } from '@system/hooks'
import { AnimatedFREC, FREC, MutatedProps } from '@system/types'
import { forwardRef } from 'react'
import { animated } from 'react-spring'

/**
 * @file Render a `<dialog>` element
 * @module components/ui/atoms/Dialog/impl
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
 * Renders a `<dialog>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/dialog
 * - https://developer.mozilla.org/docs/Web/API/HTMLDialogElement
 */
export const Dialog: FREC<DialogProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<typeof props, AnimatedFREC<'dialog'>>(
    props
  )

  return <animated.dialog {...sanitized} ref={ref} />
})

Dialog.displayName = 'Dialog'

Dialog.defaultProps = {
  open: false
}
