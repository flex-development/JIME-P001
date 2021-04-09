import type { CollectionListingData, ProductListingData } from '@core/types'
import type { LinkProps } from '@system/lib/atoms/Link'
import type { MainProps } from '@system/lib/atoms/Main'

/**
 * @file Component Props - CollectionTemplate
 * @module lib/templates/CollectionTemplate/props
 */

export interface CollectionTemplateProps extends MainProps {
  /**
   * Collection listing object.
   */
  collection: Partial<CollectionListingData>

  /**
   * Returns a `LinkProps` object for a product listing.
   */
  handleProductLink?(product: ProductListingData): LinkProps

  /**
   * Array of product listings for the current collection.
   *
   * @default []
   */
  products?: ProductListingData[]
}
