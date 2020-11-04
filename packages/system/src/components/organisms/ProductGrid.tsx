import { useMutatedProps } from '@system/hooks'
import { ProductResource } from '@system/types'
import { getProductCardProps } from '@system/utils'
import React, { FC } from 'react'
import { Column, Row, RowProps } from '../atoms'
import { ProductCard } from '../molecules'
/**
 * @file Product layout component
 * @module components/organisms/ProductGrid
 */

export interface ProductGridProps extends RowProps {
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
 * Renders a `Row` component with the class `product-grid`.
 */
export const ProductGrid: FC<ProductGridProps> = (props: ProductGridProps) => {
  const { products = [], ...rest } = props

  const mutated = useMutatedProps<typeof rest>(rest, 'product-grid')

  return (
    <Row {...mutated}>
      {products.map(product => {
        const card = getProductCardProps(product)

        return (
          <Column key={card.id}>
            <ProductCard {...card} />
          </Column>
        )
      })}
    </Row>
  )
}

ProductGrid.displayName = 'ProductGrid'

ProductGrid.defaultProps = {
  gy: 24,
  md: 3,
  products: [],
  sm: 2,
  xs: 1
}
