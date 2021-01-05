import { ComponentPropsBase } from '@system/types'
import { InputValue } from '../Input'

/**
 * @file Component Props - Option
 * @module lib/atoms/Option/props
 */

export interface OptionProps extends ComponentPropsBase<'option'> {
  /**
   * If true, render as `Form` element.
   */
  $form?: boolean

  /**
   * If true, make option uncheckable.
   */
  disabled?: boolean

  /**
   * Meaning of the option. If the `label` isn't defined, its value is that of
   * the element text content.
   */
  label?: string

  /**
   * Value to be submitted with the form, should this option be selected. If
   * this attribute is omitted, the value is taken from the text content of the
   * option element.
   */
  value?: InputValue
}
