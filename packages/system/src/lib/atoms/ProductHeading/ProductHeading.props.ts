import type { NumberString } from '@flex-development/kustomzcore'
import type { HeadingProps } from '@system/lib/atoms/Heading'

/**
 * @file Component Props - ProductHeading
 * @module lib/atoms/ProductHeading/props
 */

export interface ProductHeadingProps extends HeadingProps {
  /**
   * The price of the product variant.
   *
   * @default 0
   */
  price?: NumberString

  /**
   * The title of the product or product variant.
   */
  title: string
}
