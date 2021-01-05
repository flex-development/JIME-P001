import { AnyObject } from '@flex-development/json'
import { useSanitizedProps, useTransformScaleX } from '@system/hooks'
import { EventHandlers, FREC } from '@system/types'
import { isBoolean, isUndefined } from 'lodash'
import { forwardRef, useCallback } from 'react'
import { a, animated } from 'react-spring'
import { ButtonProps } from './Button.props'

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
  const _scale = isBoolean($scale) || isUndefined($scale) ? [] : $scale
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
    <a.button {...sanitized} onClick={onClickCB} ref={ref}>
      {(() => {
        if (!$scale) return children
        return <animated.div style={scalex.style}>{children}</animated.div>
      })()}
    </a.button>
  )
})

Button.displayName = 'Button'

Button.defaultProps = {
  type: 'button'
}
