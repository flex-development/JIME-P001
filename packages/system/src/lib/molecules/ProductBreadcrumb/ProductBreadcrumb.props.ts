import {
  IProductListing,
  IProductListingVariant
} from '@flex-development/kustomzcore'
import { BoxProps, LinkProps } from '@system/lib/atoms'

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
