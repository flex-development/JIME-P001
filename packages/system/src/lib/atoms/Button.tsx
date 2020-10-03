import { useIcon, useMutatedProps } from '@kustomz/hooks'
import {
  ButtonVariant,
  FormControlSize,
  MutatedFormControlProps
} from '@kustomz/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'
import { IconProps } from './Icon'

/**
 * @module lib/elements/Button
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/button
 */

/**
 * Button component properties.
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
   * Create a block level button.
   *
   * See: https://v5.getbootstrap.com/docs/5.0/components/buttons/#sizes
   */
  block?: boolean

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
 * Button component properties without the `ref` property.
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
  const { block, size, variant, ...rest } = props

  const withIcon = useIcon<HTMLButtonElement, ButtonProps>(rest)

  const mutatedProps = useMutatedProps<
    typeof withIcon,
    JSX.IntrinsicElements['button']
  >(withIcon, {
    btn: true,
    'btn-block': block,
    [`btn-${size}`]: size,
    [`btn-${variant}`]: variant
  })

  if (rest.disabled) mutatedProps['aria-disabled'] = true

  /* eslint-disable react/button-has-type */
  return <button {...mutatedProps} ref={ref} />
})

Button.defaultProps = {
  type: 'button',
  variant: 'primary'
}
