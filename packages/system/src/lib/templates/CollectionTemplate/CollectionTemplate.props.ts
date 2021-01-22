import type {
  ICollectionListing,
  IProductListing
} from '@flex-development/kustomzcore/types'
import type { LinkProps } from '@system/lib/atoms/Link'
import type { MainProps } from '@system/lib/atoms/Main'

/**
 * @file Component Props - CollectionTemplate
 * @module lib/templates/CollectionTemplate/props
 */

export interface CollectionTemplateProps extends MainProps {
  /**
   * The `ICollectionListing` object.
   */
  collection: ICollectionListing

  /**
   * Returns a `LinkProps` for the `ProductCard` link.
   */
  handleProductLink?(product: IProductListing): LinkProps

  /**
   * Array of `IProductListing` objects that belong to the current collection.
   *
   * @default []
   */
  products?: Array<IProductListing>
}
