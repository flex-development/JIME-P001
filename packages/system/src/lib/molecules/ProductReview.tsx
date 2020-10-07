import { ProductReviewEntity } from '@flex-development/kustomtypez'
import { useMutatedProps } from '@kustomz/hooks'
import React, { FC } from 'react'
import { Box, BoxProps, Image, Paragraph } from '../atoms'

/**
 * @file Render a product review submitted by a customer
 * @module lib/molecules/ProductReview
 */

/**
 * `ProductReview` component properties.
 */
export interface ProductReviewProps extends BoxProps {
  /**
   * Product review text.
   *
   * @default ''
   */
  body: ProductReviewEntity['body']

  /**
   * Unique product review ID.
   */
  id: ProductReviewEntity['id']

  /**
   * Name of the customer who posted the review.
   */
  name: ProductReviewEntity['name']
}

/**
 * Renders a `Box` component display a customer name and their product review.
 */
export const ProductReview: FC<ProductReviewProps> = (
  props: ProductReviewProps
) => {
  const { body, name, ...rest } = props

  const mutatedProps = useMutatedProps<typeof rest>(rest, 'product-review')

  return (
    <Box {...mutatedProps}>
      <Box className='col'>
        <Image
          className='product-review-img'
          fluid
          src='/customer.svg'
        />
      </Box>
      <Box className='product-review-text col-sm-10 col-12'>
        <Paragraph className='product-review-name'>{name}</Paragraph>
        <Paragraph className='product-review-body'>{body}</Paragraph>
      </Box>
    </Box>
  )
}
