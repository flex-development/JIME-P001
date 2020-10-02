import { ProductVariantObject } from '@flex-development/kustomtypez'
import { useMutatedProps } from '@kustomz/hooks'
import React, { FC } from 'react'
import { Heading, HeadingProps, Span } from '../atoms'

/**
 * @file Render a ProductVariant title and price
 * @module lib/molecules/ProductHeading
 */

/**
 * ProductHeading component properties.
 */
export interface ProductHeadingProps extends HeadingProps {
  /**
   * The price of the product variant.
   */
  price: ProductVariantObject['price']

  /**
   * The product variant’s title.
   */
  title: ProductVariantObject['title']
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
  const { price, title, ...rest } = props

  const mutatedProps = useMutatedProps(rest, 'product-heading')

  return (
    <Heading {...mutatedProps}>
      <Span className='product-heading-title'>{title}</Span>
      <Span className='product-heading-price'>
        {price.length && `${price}`}
      </Span>
    </Heading>
  )
}
