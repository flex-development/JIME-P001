import { HeadingProps } from '../Heading'

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
  price?: number | string

  /**
   * The title of the product or product variant.
   */
  title: string
}
