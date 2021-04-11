import { EMPTY_SPACE } from '@core/config/constants'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { Box, BoxProps } from '@system/lib/atoms/Box'
import { Link } from '@system/lib/atoms/Link'
import { Paragraph } from '@system/lib/atoms/Paragraph'
import { Span } from '@system/lib/atoms/Span'
import { ProductRating } from '@system/lib/molecules/ProductRating'
import type { FC } from 'react'
import type { ProductReviewProps } from './ProductReview.props'

/**
 * @file Implementation - ProductReview
 * @module lib/molecules/ProductReview/impl
 */

/**
 * Displays a product image and review. Clicking on the product image will open
 * the page for the product in a new tab.
 *
 * Renders a `Box` component with the class `product-review`.
 */
export const ProductReview: FC<ProductReviewProps> = props => {
  const { review, ...rest } = props

  const {
    body,
    created_at,
    id,
    product_handle,
    product_title,
    rating,
    reviewer: { name },
    title
  } = review

  const sanitized = useSanitizedProps<'div', BoxProps>(rest, 'product-review')
  const has_title = !!title && title.length

  return (
    <Box
      {...sanitized}
      id={`product-review-${id}`}
      data-product={product_handle}
    >
      <ProductRating
        aria-label='Product rating'
        className='product-review-rating'
        rating={rating}
      />

      <Paragraph
        className='product-review-header'
        data-has-title={has_title || undefined}
      >
        <Link
          aria-label='View product'
          className='product-review-header-product'
          href={`/products/${product_handle}`}
        >
          {product_title}
        </Link>

        <Span className='product-review-header-divider'>/</Span>
        <Span className='product-review-header-title'>{title || id}</Span>
      </Paragraph>

      <Paragraph className='product-review-body'>{body}</Paragraph>

      <Box className='product-review-footer'>
        <Box className='product-review-reviewer'>
          <Span className='product-review-reviewer-initials'>
            {((): string => {
              const { 0: fname = '', 1: lname = '' } = name.split(EMPTY_SPACE)
              return `${fname[0] || ''}${lname[0] || ''}`.toUpperCase()
            })()}
          </Span>
          <Span className='product-review-reviewer-name'>{name}</Span>
        </Box>

        <Paragraph className='product-review-date'>
          {new Date(created_at).toLocaleDateString('en-US')}
        </Paragraph>
      </Box>
    </Box>
  )
}

ProductReview.displayName = 'ProductReview'

ProductReview.defaultProps = {}
