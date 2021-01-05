import { IProductListing } from '@flex-development/kustomzcore'
import { BoxProps, LinkProps } from '@system/lib/atoms'

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
