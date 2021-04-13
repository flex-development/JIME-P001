import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { AnimatedFREC, FREC } from '@system/types'
import { forwardRef } from 'react'
import type { DialogProps } from './Dialog.props'

/**
 * @file Implementation - Dialog
 * @module lib/atoms/Dialog/impl
 */

/**
 * Renders a `<dialog>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/dialog
 * - https://developer.mozilla.org/docs/Web/API/HTMLDialogElement
 */
export const Dialog: FREC<DialogProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<'dialog'>(props)
  return <dialog {...sanitized} ref={ref} />
})

Dialog.displayName = 'Dialog'

Dialog.defaultProps = {}

export const DialogAnimated: AnimatedFREC<DialogProps> = a(Dialog)

DialogAnimated.displayName = 'DialogAnimated'

DialogAnimated.defaultProps = {}
