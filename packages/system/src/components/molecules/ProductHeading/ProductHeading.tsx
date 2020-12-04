import { useMutatedProps } from '@system/hooks'
import { formatPrice } from '@system/utils'
import { FC } from 'react'
import { Heading, HeadingProps, Span } from '../../atoms'

/**
 * @file Displays the title and price of a product (variant)
 * @module components/molecules/ProductHeading/impl
 */

/**
 * `ProductHeading` component properties.
 */
export interface ProductHeadingProps extends HeadingProps {
  /**
   * The price of the product variant.
   *
   * @default 0
   */
  price?: number | string

  /**
   * The title of the product or product variant.
   */
  title: string
}

/**
 * Displays the title and price of a product (variant).
 *
 * - https://shopify.dev/docs/storefront-api/reference/object/productvariant
 */
export const ProductHeading: FC<ProductHeadingProps> = (
  props: ProductHeadingProps
) => {
  const { price = 0, title, ...rest } = props

  const mutated = useMutatedProps(rest, 'product-heading')

  return (
    <Heading {...mutated}>
      <Span className='product-heading-title'>{title}</Span>
      <Span className='product-heading-price'>{formatPrice(price)}</Span>
    </Heading>
  )
}

ProductHeading.displayName = 'ProductHeading'

ProductHeading.defaultProps = {
  price: 0
}
