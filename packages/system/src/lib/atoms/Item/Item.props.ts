import { ComponentPropsBase } from '@system/types'
import { InputValue } from '../Input'

/**
 * @file Component Props - Item
 * @module lib/atoms/Item/props
 */

export interface ItemProps extends ComponentPropsBase<'li'> {
  /**
   * If true, render as `Dropdown` item.
   */
  $dropdown?: boolean

  /**
   * If true, render as `Menu` item.
   */
  $menu?: boolean

  /**
   * Current value of the form control.
   *
   * Submitted with the form as part of a name/value pair.
   */
  value?: InputValue
}
