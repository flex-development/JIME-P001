import { getSizedImageUrl } from '@shopify/theme-images'
import { IMAGE_PLACEHOLDER_URL } from '@system/config/constants'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { Box, BoxProps } from '@system/lib/atoms/Box'
import { Image } from '@system/lib/atoms/Image'
import { Link } from '@system/lib/atoms/Link'
import { Paragraph } from '@system/lib/atoms/Paragraph'
import { FC } from 'react'
import { ProductReviewProps } from './ProductReview.props'

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
    id,
    product_image_url: src,
    product_title,
    product_url,
    title
  } = review

  const sanitized = useSanitizedProps<'div', BoxProps>(rest, 'product-review')

  const url = getSizedImageUrl(src, '1024x1024') || IMAGE_PLACEHOLDER_URL
  const url_2x = getSizedImageUrl(src, '2048x2048') || IMAGE_PLACEHOLDER_URL

  return (
    <Box {...sanitized} id={`product-review-${id}`}>
      <Box className='product-review-col'>
        <Link href={product_url} target='_blank'>
          <Image
            alt={product_title}
            className='product-review-img'
            src={url}
            srcSet={`${url} ${url_2x} 2x`}
          />
        </Link>
      </Box>
      <Box className='product-review-col'>
        <Paragraph className='product-review-title'>{title}</Paragraph>
        <Paragraph className='product-review-body'>{body}</Paragraph>
      </Box>
    </Box>
  )
}

ProductReview.displayName = 'ProductReview'

ProductReview.defaultProps = {}
