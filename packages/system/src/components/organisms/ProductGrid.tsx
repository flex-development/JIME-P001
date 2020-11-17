import { useMutatedProps } from '@system/hooks'
import { getProductCardProps } from '@system/utils'
import React, { FC } from 'react'
import { IProductListing } from 'shopify-api-node'
import { Column, Row, RowProps } from '../atoms'
import { ProductCard } from '../molecules'

/**
 * @file Product layout component
 * @module components/organisms/ProductGrid
 */

export interface ProductGridProps extends RowProps {
  /**
   * Array of `IProductListing` data to display in the grid.
   *
   * @default []
   */
  products?: IProductListing[]
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
