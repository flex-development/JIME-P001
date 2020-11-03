import { useMutatedProps } from '@system/hooks'
import { StampedProductReviewEntity } from '@system/types'
import React, { FC } from 'react'
import { Box, BoxProps, Column, Image, Link, Paragraph } from '../atoms'

/**
 * @file Display a product review submitted by a customer
 * @module components/molecules/ProductReview
 */

/**
 * `ProductReview` component properties.
 */
export interface ProductReviewProps extends Omit<BoxProps, 'id'> {
  /**
   * Product review text.
   *
   * @default ''
   */
  body: StampedProductReviewEntity['body']

  /**
   * Unique product review ID.
   */
  id: StampedProductReviewEntity['id']

  /**
   * Image URL of the product being reviewed.
   */
  productImageUrl?: StampedProductReviewEntity['productImageUrl']

  /**
   * Title of the product being reviewed.
   */
  productTitle: StampedProductReviewEntity['productTitle']

  /**
   * Link to the page of the product being reviewed.
   */
  productUrl: StampedProductReviewEntity['productUrl']

  /**
   * Review title.
   */
  title: string
}

/**
 * Displays a product image and review. Clicking on the product image will open
 * the page for the product in a new tab.
 *
 * Renders a `Box` component with the class `product-review`.
 */
export const ProductReview: FC<ProductReviewProps> = (
  props: ProductReviewProps
) => {
  const {
    body,
    id,
    productImageUrl,
    productTitle,
    productUrl,
    title,
    ...rest
  } = props

  const mutated = useMutatedProps<typeof rest>(rest, 'product-review')

  return (
    <Box {...mutated} id={`product-review-${id}`}>
      <Link className='product-review-img' href={productUrl} target='_blank'>
        <Image alt={productTitle} fluid src={productImageUrl} />
      </Link>
      <Column
        className='product-review-text'
        lg={10}
        px={36}
        py={{ sm: 0, xs: 36 }}
        sm={8}
        xs={12}
      >
        <Paragraph className='product-review-title'>{title}</Paragraph>
        <Paragraph className='product-review-body' mb={0}>
          {body}
        </Paragraph>
      </Column>
    </Box>
  )
}