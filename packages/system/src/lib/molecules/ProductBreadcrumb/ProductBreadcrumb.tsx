import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { Box, BoxProps } from '@system/lib/atoms/Box'
import { Link } from '@system/lib/atoms/Link'
import { Paragraph } from '@system/lib/atoms/Paragraph'
import { Span } from '@system/lib/atoms/Span'
import classnames from 'classnames'
import type { FC } from 'react'
import type { ProductBreadcrumbProps } from './ProductBreadcrumb.props'

/**
 * @file Implementation - ProductBreadcrumb
 * @module lib/molecules/ProductBreadcrumb/impl
 */

/**
 * Displays a collection title link, product title, and product variant title.
 * Renders a `Box` component with the class `product-breadcrumb`.
 */
export const ProductBreadcrumb: FC<ProductBreadcrumbProps> = props => {
  const { collection, product = '', variant = '', ...rest } = props

  const sanitized = useSanitizedProps<'div', BoxProps>(
    rest,
    'product-breadcrumb'
  )

  return (
    <Box {...sanitized}>
      <Link
        {...collection}
        className={classnames('product-breadcrumb-c', collection.className)}
      />
      &nbsp;<Span className='product-breadcrumb-divider'>|</Span>&nbsp;
      <Paragraph className='product-breadcrumb-p'>{product}</Paragraph>
      &nbsp;<Span className='product-breadcrumb-divider'>|</Span>&nbsp;
      <Paragraph className='product-breadcrumb-v'>{variant}</Paragraph>
    </Box>
  )
}

ProductBreadcrumb.displayName = 'ProductBreadcrumb'

ProductBreadcrumb.defaultProps = {
  product: '',
  variant: ''
}
