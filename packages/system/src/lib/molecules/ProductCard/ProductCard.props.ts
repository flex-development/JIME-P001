import type { IProductListing } from '@kustomzcore/types'
import type { BoxProps } from '@system/lib/atoms/Box'
import type { LinkProps } from '@system/lib/atoms/Link'

/**
 * @file Component Props - ProductCard
 * @module lib/molecules/ProductCard/props
 */

export interface ProductCardProps extends BoxProps {
  /**
   * The `IProductListing` object.
   */
  product: IProductListing

  /**
   * Product `Link` component props.
   *
   * @default {}
   */
  product_link?: LinkProps
}
