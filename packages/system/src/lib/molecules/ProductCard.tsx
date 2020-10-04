import { Product } from 'shopify-buy'
import { BoxProps } from '../atoms'

/**
 * @file Render a Product preview
 * @module lib/molecules/ProductCard
 */


/**
 * `ProductCard` component properties.
 */
export interface ProductCardProps extends Omit<BoxProps, 'id'> {
  /**
   * Unique product id.
   */
  id: Product['id']

  /**
   * All product images.
   */
  images: Product['images']

  /**
   * The product title.
   */
  title: Product['title']

  /**
   * All variants of a product.
   */
  variants: Product['variants']
}
