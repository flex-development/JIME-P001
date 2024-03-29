import type { APIPayload } from '@core/types'
import type { MainProps } from '@system/lib/atoms/Main'
import type { ProductReviewProps } from '@system/lib/molecules/ProductReview'
import type { ProductGridProps } from '@system/lib/organisms/ProductGrid'

/**
 * @file Component Props - IndexTemplate
 * @module lib/templates/IndexTemplate/props
 */

export interface IndexTemplateProps extends MainProps {
  /**
   * Index page data.
   *
   * Relevent metafields:
   *
   * - `about_section_text`
   * - `about_section_title`, default: 'About Morena'
   * - `max_products`, default: 12
   * - `max_reviews`, default: 5
   * - `products_section_text`
   * - `products_section_title`, default: 'Products'
   * - `reviews_section_title`, default: 'Reviews'
   */
  page: APIPayload.Page

  /**
   * Array of product listings or product card data.
   *
   * @default []
   */
  products?: ProductGridProps['products']

  /**
   * Array of product reviews.
   *
   * @default []
   */
  reviews?: ProductReviewProps['review'][]
}
