import { useTransformScaleX } from '@system/hooks'
import {
  Color,
  ComponentPropsBase as CPB,
  FormComponentProps
} from '@system/types'
import { IconProps } from '../Icon'

/**
 * @file Component Props - Button
 * @module lib/atoms/Button/props
 */

export interface ButtonProps extends CPB<'button'>, FormComponentProps {
  /**
   * If true, make the `Button` span the full width of its parent container.
   */
  $fluid?: boolean

  /**
   * Icon to render beside the element text.
   */
  $icon?: IconProps

  /**
   * If true, use default `transform: scale` animation properties. Default
   * values can be overriden by passing a config object instead.
   */
  $scale?: Parameters<typeof useTransformScaleX> | boolean

  /**
   * Button background color.
   */
  $variant?: Color

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
}
