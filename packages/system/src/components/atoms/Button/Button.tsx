import { AnyObject } from '@flex-development/json'
import { ButtonVariant, FormControlSize } from '@flex-development/kustomzcore'
import { useSanitizedProps, useTransformScaleX } from '@system/hooks'
import {
  AnimatedFREC,
  EventHandlers,
  FREC,
  MutatedFormControlProps
} from '@system/types'
import { isBoolean, isUndefined } from 'lodash'
import { forwardRef, useCallback } from 'react'
import { animated } from 'react-spring'
import { IconProps } from '../Icon/Icon'

/**
 * @module components/atoms/Button/impl
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/button
 */

export interface ButtonProps
  extends Omit<MutatedFormControlProps<HTMLButtonElement>, 'variant'> {
  /**
   * This attribute on a `<button>` is nonstandard and Firefox-specific.
   *
   * Unlike other browsers, Firefox persists the dynamic disabled state of a
   * `<button>` across page loads.
   *
   * Setting `autoComplete="off"` on the button disables this feature.
   */
  autoComplete?: 'off'

  /**
   * If true, add the class `w-100`.
   */
  fluid?: boolean

  /**
   * The URL to which to submit the form's data; overrides the parent form's
   * `action` attribute, if any.
   */
  formAction?: string

  /**
   * A string specifying the encoding type to use for the form data; overrides the parent form's `encType` attribute, if any.
   */
  formEncType?: string

  /**
   * The HTTP method (get or post) to use when submitting the form; overrides
   * the parent form's `method` attribute, if any.
   */
  formMethod?: string

  /**
   * If true, the form's fields will not be subjected to constraint validation
   * before submitting the data to the server; overrides the parent form's
   * `noValidate` attribute, if any.
   */
  formNoValidate?: boolean

  /**
   * The browsing context into which to load the response returned by the server
   * after submitting the form; overrides the parent form's `target` attribute,
   * if any.
   */
  formTarget?: string

  /**
   * Icon to render beside the element text.
   */
  icon?: IconProps

  /**
   * If true, use default `transform: scale` animation properties. Default
   * values can be overriden by passing a config object instead.
   */
  scale?: Parameters<typeof useTransformScaleX> | boolean

  /**
   * Make a button smaller or larger.
   *
   * See: https://v5.getbootstrap.com/docs/5.0/components/buttons/#sizes
   */
  size?: false | FormControlSize

  /**
   * Default behavior of the button. Possible values:
   *
   * - `submit`: The button submits the form data to the server. This is the
   *   default if the attribute is not specified for buttons associated with a
   *   `<form>`, or if the attribute is an empty or invalid value.
   * - `reset`: The button resets all the controls to their initial values, like
   *   `<input type="reset">`
   * - `button`: The button has no default behavior, and does nothing when
   *   pressed by default.  It can have client-side scripts listen to the
   *   element's events, which are triggered when the events occur
   *
   * @default 'button'
   */
  type?: 'submit' | 'reset' | 'button'

  /**
   * Button variant.
   *
   * @default 'primary'
   */
  variant?: false | ButtonVariant
}

/**
 * Renders a `<button>` element with the class `btn`.
 *
 * - https://v5.getbootstrap.com/docs/5.0/components/buttons
 * - https://developer.mozilla.org/docs/Web/HTML/Element/button
 * - https://developer.mozilla.org/docs/Web/API/HTMLButtonElement
 */
export const Button: FREC<ButtonProps> = forwardRef((props, ref) => {
  const { fluid, scale, size, variant, ...rest } = props

  const _scale = isBoolean(scale) || isUndefined(scale) ? [] : scale
  const scalex = useTransformScaleX(_scale[0], _scale[1], _scale[2])

  const sanitized = useSanitizedProps<typeof rest, AnimatedFREC<'button'>>(
    { ...rest, 'aria-disabled': rest.disabled ? true : undefined },
    {
      btn: true,
      [`btn-${size}`]: size,
      [`btn-${variant}`]: variant,
      'w-100': fluid
    }
  )

  const onClick = (event: EventHandlers.Click.Button) => {
    if (rest.onClick) rest.onClick(event)
    if (scale) scalex.toggle()
  }

  const { children } = sanitized as AnyObject

  return (
    <animated.button
      {...sanitized}
      onClick={useCallback(onClick, [rest, scale, scalex])}
      ref={ref}
    >
      {(() => {
        if (!scale) return children
        return <animated.div style={scalex.style}>{children}</animated.div>
      })()}
    </animated.button>
  )
})

Button.displayName = 'Button'

Button.defaultProps = {
  type: 'button',
  variant: 'primary'
}
