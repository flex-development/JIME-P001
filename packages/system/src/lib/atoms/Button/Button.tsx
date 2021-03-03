import type { AnyObject } from '@flex-development/json/utils/types'
import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { useTransformScaleX } from '@system/hooks/useTransformScaleX'
import { BoxAnimated } from '@system/lib/atoms/Box'
import type { AnimatedFREC, EventHandlers, FREC } from '@system/types'
import { forwardRef, useCallback } from 'react'
import type { ButtonProps } from './Button.props'

/**
 * @file Implementation - Button
 * @module lib/atoms/Button/impl
 */

/**
 * Renders a `<button>` element with the class `btn`.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/button
 * - https://developer.mozilla.org/docs/Web/API/HTMLButtonElement
 */
export const Button: FREC<ButtonProps> = forwardRef((props, ref) => {
  const { $fluid, $scale, $variant, ...rest } = props

  // Get component properties
  const sanitized = useSanitizedProps<'button'>(
    { ...rest, 'aria-disabled': rest.disabled ? true : undefined },
    {
      btn: true,
      [`btn-${$variant}`]: $variant,
      'btn-fluid': $fluid
    }
  )

  // Handle scale animation
  const bool = typeof $scale === 'boolean'
  const undef = typeof $scale === 'undefined'

  const _scale = (bool || undef ? [] : $scale) as Parameters<
    typeof useTransformScaleX
  >

  const scalex = useTransformScaleX(_scale[0], _scale[1], _scale[2])

  /**
   * Calls `props.onClick` if defined and the function to toggle the scale
   * animation, if enabled.
   *
   * @param event `click` event from `<button>` element
   */
  const onClick = (event: EventHandlers.Click.Button) => {
    if (rest.onClick) rest.onClick(event)
    if ($scale) scalex.toggle()
  }

  /* Callback version of `onClick` */
  const onClickCB = useCallback(onClick, [rest, $scale, scalex])

  const { children } = sanitized as AnyObject

  return (
    <button {...sanitized} onClick={onClickCB} ref={ref}>
      {(() => {
        if (!$scale) return children
        return <BoxAnimated style={scalex.style}>{children}</BoxAnimated>
      })()}
    </button>
  )
})

Button.displayName = 'Button'

Button.defaultProps = {
  type: 'button'
}

const ButtonAnimated: AnimatedFREC<ButtonProps> = a(Button)

ButtonAnimated.displayName = 'ButtonAnimated'

ButtonAnimated.defaultProps = Button.defaultProps
