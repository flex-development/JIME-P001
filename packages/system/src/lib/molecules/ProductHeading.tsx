import React, { FC } from 'react'
import { Heading, HeadingProps, Span } from '../atoms'

/**
 * @file Render a ProductVariant title and price
 * @module lib/molecules/ProductHeading
 */

/**
 * ProductHeading component properties.
 */
export type ProductHeadingProps = {
  /**
   * The price of the product variant.
   */
  price: string

  /**
   * Size of the heading.
   */
  size?: HeadingProps['size']

  /**
   * The product variant’s title.
   */
  title: string
}

/**
 * Renders the title and price of a product or product variant inside of a
 * `Heading` component.
 *
 * - https://shopify.dev/docs/storefront-api/reference/object/productvariant
 */
export const ProductHeading: FC<ProductHeadingProps> = (
  props: ProductHeadingProps
) => {
  const { price, size, title } = props

  return (
    <Heading className='product-heading' size={size}>
      <Span className='product-heading-title'>{title}</Span>
      <Span className='product-heading-price'>${price}</Span>
    </Heading>
  )
}
