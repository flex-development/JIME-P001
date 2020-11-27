import { useMutatedProps } from '@system/hooks'
import React, { FC } from 'react'
import { IProductListing, IProductListingVariant } from 'shopify-api-node'
import {
  FlexBox,
  FlexBoxProps,
  Link,
  LinkProps,
  Paragraph,
  Span
} from '../../atoms'

/**
 * @file Display a collection link, product title, and product variant title
 * @module components/molecules/ProductBreadcrumb/ProductBreadcrumb
 */

export interface ProductBreadcrumbProps extends FlexBoxProps {
  /**
   * Link to product collection.
   */
  collection: LinkProps

  /**
   * Product title.
   */
  product: IProductListing['title']

  /**
   * Product variant title.
   */
  variant: IProductListingVariant['title']
}

/**
 * Displays a collection title link, product title, and product variant title.
 *
 * Renders a `FlexBox` component with the class `product-breadcrumb`.
 */
export const ProductBreadcrumb: FC<ProductBreadcrumbProps> = (
  props: ProductBreadcrumbProps
) => {
  const { collection, product, variant, ...rest } = props

  const mutated = useMutatedProps<typeof rest>(rest, 'product-breadcrumb')

  return (
    <FlexBox {...mutated}>
      <Link {...collection} />
      &nbsp;<Span className='product-breadcrumb-divider'>/</Span>&nbsp;
      <Paragraph className='product-breadcrumb-p'>{product}</Paragraph>
      &nbsp;<Span className='product-breadcrumb-divider'>/</Span>&nbsp;
      <Paragraph className='product-breadcrumb-v'>{variant}</Paragraph>
    </FlexBox>
  )
}

ProductBreadcrumb.displayName = 'ProductBreadcrumb'

ProductBreadcrumb.defaultProps = {}