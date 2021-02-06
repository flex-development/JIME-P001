import type { InputValue } from '@system/lib/atoms/Input'
import type { ComponentPropsBase } from '@system/types'

/**
 * @file Component Props - Option
 * @module lib/atoms/Option/props
 */

export interface OptionProps extends ComponentPropsBase<'option'> {
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
