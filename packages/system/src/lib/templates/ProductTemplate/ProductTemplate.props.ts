import { ANYTHING } from '@flex-development/json'
import { IProductListing, IReview } from '@flex-development/kustomzcore'
import { LinkProps, MainProps } from '@system/lib/atoms'
import { AddToCartFormProps } from '@system/lib/molecules'
import { EventHandlers } from '@system/types'

/**
 * @file Component Props - ProductTemplate
 * @module lib/templates/ProductTemplate/props
 */

export interface ProductTemplateProps extends MainProps {
  /**
   * Index position of the carousel slide to display first.
   *
   * @default 0
   */
  active?: number

  /**
   * Title and link of the collection the `product` belongs to.
   */
  collection: LinkProps

  /**
   * Fires when the user clicks the "Add to Cart" button.
   */
  handleAddToCart?: AddToCartFormProps['handleSubmit']

  /**
   * Fires when the user clicks the "Submit Review" button.
   */
  handleSubmitReview?: (event: EventHandlers.Click.Button) => ANYTHING

  /**
   * Shopify `IProductListing` object.
   */
  product: IProductListing

  /**
   * Array of product reviews for `product`.
   *
   * @default []
   */
  reviews?: Array<IReview>

  /**
   * Maximum number of product reviews to show in a group.
   *
   * @default 2
   */
  reviews_chunk_max?: number
}
