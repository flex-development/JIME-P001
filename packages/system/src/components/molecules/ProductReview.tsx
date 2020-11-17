import { IReview } from '@flex-development/types'
import { useMutatedProps } from '@system/hooks'
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
  body: IReview['body']

  /**
   * Unique product review ID.
   */
  id: IReview['id']

  /**
   * Image URL of the product being reviewed.
   */
  product_image_url?: IReview['product_image_url']

  /**
   * Title of the product being reviewed.
   */
  product_title: IReview['product_title']

  /**
   * Link to the page of the product being reviewed.
   */
  product_url: IReview['product_url']

  /**
   * Review title.
   */
  title: IReview['title']
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
    product_image_url,
    product_title,
    product_url,
    title,
    ...rest
  } = props

  const mutated = useMutatedProps<typeof rest>(rest, 'product-review')

  return (
    <Box {...mutated} id={`product-review-${id}`}>
      <Link className='product-review-img' href={product_url} target='_blank'>
        <Image alt={product_title} fluid src={product_image_url} />
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

ProductReview.displayName = 'ProductReview'

ProductReview.defaultProps = {
  body: ''
}
