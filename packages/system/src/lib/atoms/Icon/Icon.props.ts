import { SHOPIFY_POLARIS_ICONS } from '@system/config'
import { Color, ComponentPropsBase, Direction } from '@system/types'

/**
 * @file Component Props - Icon
 * @module lib/atoms/Icon/props
 */

export interface IconProps extends ComponentPropsBase<'svg'> {
  /**
   * Adjust the icon's `fill` color.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/fill
   */
  $fill?: Color

  /**
   * Adjust the icon's `stroke` color.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/stroke
   */
  $stroke?: Color

  /**
   * Name of a Shopify Polaris icon to display.
   *
   * - https://polaris-icons.shopify.com/
   */
  children?: keyof typeof SHOPIFY_POLARIS_ICONS

  /**
   * If rendering inside of another component, this value determines where the
   * `Icon` will be placed.
   */
  'data-position'?: Direction
}
