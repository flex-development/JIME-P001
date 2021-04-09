import type { ProductListingData } from '@core/types'
import type { BoxProps } from '@system/lib/atoms/Box'
import type { LinkProps } from '@system/lib/atoms/Link'

/**
 * @file Component Props - ProductCard
 * @module lib/molecules/ProductCard/props
 */

export interface ProductCardProps extends BoxProps {
  /**
   * Product listing data.
   */
  product: ProductListingData

  /**
   * Product `Link` component props.
   *
   * @default {}
   */
  product_link?: LinkProps
}
