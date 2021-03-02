import type { AnyObject } from '@flex-development/json'
import type { MainProps } from '@system/lib/atoms/Main'
import type { ProductGridProps } from '@system/lib/organisms/ProductGrid'

/**
 * @file Component Props - IndexTemplate
 * @module lib/templates/IndexTemplate/props
 */

export interface IndexTemplateProps extends MainProps {
  /**
   * Text to display in the "About" section.
   *
   */
  about_section_text: string

  /**
   * "About" section title.
   *
   * @default 'About Morena'
   */
  about_section_title?: string

  /**
   * Maximum number of products to display in the "Products" section.
   *
   * @default 3
   */
  max_products?: number

  /**
   * Maximum number of review to display in the "Reviews" section.
   *
   * @default 5
   */
  max_reviews?: number

  /**
   * Array of product listings or product card data.
   *
   * @default []
   */
  products?: ProductGridProps['products']

  /**
   * Text to display in the "Products" section.
   *
   */
  products_section_text?: string

  /**
   * "Products" section title.
   *
   * @default 'Products'
   */
  products_section_title?: string

  /**
   * Array of product review objects.
   *
   * @default []
   */
  reviews?: Array<AnyObject>

  /**
   * "Reviews" section title.
   *
   * @default 'Reviews'
   */
  reviews_section_title?: string
}
