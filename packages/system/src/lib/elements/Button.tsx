import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes,
} from 'react'
import {
  ButtonVariant,
  FormControlSize,
  PropsForFormElement,
  ThemeColor,
} from '../declarations'
import {useMutatedProps} from '../modules/hooks'

/**
 * @module lib/elements/Button
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/button}
 */

/**
 * {@link Button} component properties.
 */
export interface ButtonProps
  extends Omit<PropsForFormElement<HTMLButtonElement>, 'variant'> {
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
   * Text color.
   *
   * @default false
   */
  color?: boolean | ThemeColor

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
   * Button text size.
   *
   * @default false
   */
  size?: boolean | FormControlSize

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
   * @default false
   */
  variant?: false | ButtonVariant
}

/**
 * {@link Button} component properties without the `ref` property.
 */
export type ReflessButtonProps = PropsWithoutRef<ButtonProps>

/**
 * Ref attributes for `<button>` elements.
 */
export type ButtonRefAttributes = RefAttributes<HTMLButtonElement>

/**
 * {@link Button} component forward ref properties.
 */
export type ButtonRefProps = ReflessButtonProps & ButtonRefAttributes

/**
 * Renders a `<button>` element with the class `btn`.
 *
 * - **https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button**
 * - **https://v5.getbootstrap.com/docs/5.0/components/buttons/**
 */
export const Button: FREC<ButtonRefProps> = forwardRef((props, ref) => {
  const {color, size, ...rest} = props

  if (rest.icon && !rest.children) rest.variant = 'ghost'

  const mutatedProps = useMutatedProps<
    typeof rest,
    JSX.IntrinsicElements['button']
  >(rest, {
    btn: true,
    disabled: rest.disabled && rest.disabled,
    [`btn-${size}`]: size,
    [`text-${color}`]: color,
  })

  return <button {...mutatedProps} ref={ref} />
})

Button.defaultProps = {
  color: false,
  size: false,
  type: 'button',
  variant: false,
}
