import { ProductResource } from '@flex-development/kustomtypez'
import { useMutatedProps } from '@system/hooks'
import { getProductCardProps } from '@system/utils'
import React, { FC } from 'react'
import { Box, BoxProps, Column } from '../atoms'
import { ProductCard } from '../molecules'
/**
 * @file Product layout component
 * @module lib/organisms/ProductGrid
 */

export interface ProductGridProps extends BoxProps {
  /**
   * Maximum number of products to display in the grid.
   */
  max?: number

  /**
   * Array of `ProductResource` data to display in the grid.
   *
   * @default []
   */
  products?: ProductResource[]
}

/**
 * Displays `ProductCard` components in a grid.
 *
 * Renders a `Box` component with the class `product-grid`.
 *
 * **TODO**
 *
 * - Implement `Row` component
 */
export const ProductGrid: FC<ProductGridProps> = (props: ProductGridProps) => {
  const { max, products = [], ...rest } = props

  const mutated = useMutatedProps<typeof rest>(rest, {
    'gy-24': true,
    'product-grid': true,
    row: true,
    'row-cols-1': true,
    'row-cols-md-3': true,
    'row-cols-sm-2': true
  })

  return (
    <Box {...mutated}>
      {(max ? products.slice(0, max) : products).map(product => {
        const card = getProductCardProps(product)

        return (
          <Column key={card.id}>
            <ProductCard {...card} />
          </Column>
        )
      })}
    </Box>
  )
}

ProductGrid.defaultProps = {
  products: []
}
