import type { ANYTHING } from '@flex-development/json/utils/types'
import type { MainProps } from '@system/lib/atoms/Main'
import type { AddToCartFormProps } from '@system/lib/molecules/AddToCartForm'
import type { CarouselProps } from '@system/lib/molecules/Carousel'
import type { ProductBreadcrumbProps } from '@system/lib/molecules/ProductBreadcrumb'
import type { ProductReviewProps } from '@system/lib/molecules/ProductReview'
import type { EventHandlers } from '@system/types'

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
  active?: AddToCartFormProps['active']

  /**
   * Title and link of the collection the `product` belongs to.
   */
  collection: ProductBreadcrumbProps['collection']

  /**
   * Fires when the user clicks the "Add to Cart" button.
   */
  handleAddToCart?: AddToCartFormProps['handleSubmit']

  /**
   * Fires when the user clicks the "Submit Review" button.
   */
  handleSubmitReview?: (event: EventHandlers.Click.Button) => ANYTHING

  /**
   * Product listing data.
   */
  product: AddToCartFormProps['product']

  /**
   * Array of product reviews for `product`.
   *
   * @default []
   */
  reviews?: ProductReviewProps['review'][]

  /**
   * Maximum number of product reviews to show in a group.
   *
   * @default 2
   */
  reviews_chunk_max?: CarouselProps['chunk_max']
}
