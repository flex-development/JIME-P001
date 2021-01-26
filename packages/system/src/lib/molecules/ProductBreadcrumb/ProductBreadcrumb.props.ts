import type {
  IProductListing,
  IProductListingVariant
} from '@flex-development/kustomzcore'
import type { BoxProps } from '@system/lib/atoms/Box'
import type { LinkProps } from '@system/lib/atoms/Link'

/**
 * @file Component Props - ProductBreadcrumb
 * @module lib/molecules/ProductBreadcrumb/props
 */

export interface ProductBreadcrumbProps extends BoxProps {
  /**
   * Link to product collection.
   */
  collection: LinkProps

  /**
   * Title of parent product.
   */
  product: IProductListing['title']

  /**
   * Product variant title.
   */
  variant: IProductListingVariant['title']
}
