import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { HeadingProps } from '@system/lib/atoms/Heading'
import { Heading } from '@system/lib/atoms/Heading'
import { Span } from '@system/lib/atoms/Span'
import { formatPrice } from '@system/utils/formatPrice'
import type { FC } from 'react'
import type { ProductHeadingProps } from './ProductHeading.props'

/**
 * @file Implementation - ProductHeading
 * @module lib/atoms/ProductHeading/impl
 */

/**
 * Displays the title and price of a parent product or product variant.
 *
 * - https://shopify.dev/docs/storefront-api/reference/object/productvariant
 */
export const ProductHeading: FC<ProductHeadingProps> = props => {
  const { $size, price = 0, title, ...rest } = props

  const sanitized = useSanitizedProps<'h1', HeadingProps>(
    rest,
    'product-heading'
  )

  return (
    <Heading {...sanitized} $size={$size}>
      <Span className='product-heading-title'>{title}</Span>
      <Span className='product-heading-price'>{formatPrice(price)}</Span>
    </Heading>
  )
}

ProductHeading.displayName = 'ProductHeading'

ProductHeading.defaultProps = {
  price: 0
}
