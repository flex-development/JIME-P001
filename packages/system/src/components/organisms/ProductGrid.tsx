import { useMutatedProps } from '@system/hooks'
import { AnyObject } from 'packages/types/src'
import React, { FC, useEffect } from 'react'
import { useArray } from 'react-hanger/array/useArray'
import { IProductListing } from 'shopify-api-node'
import { Column, Row, RowProps } from '../atoms'
import { ProductCard, ProductCardProps } from '../molecules'

/**
 * @file Product layout component
 * @module components/organisms/ProductGrid
 */

export interface ProductGridProps extends RowProps {
  /**
   * Array of `ProductCardProps` data to display in the grid.
   *
   * @default []
   */
  products?: Array<IProductListing> | Array<ProductCardProps>
}

/**
 * Displays `ProductCard` components in a grid.
 *
 * Renders a `Row` component with the class `product-grid`.
 */
export const ProductGrid: FC<ProductGridProps> = (props: ProductGridProps) => {
  const { products = [], ...rest } = props

  const mutated = useMutatedProps<typeof rest>(rest, 'product-grid')

  const [cards, { setValue: setCards }] = useArray<ProductCardProps>([])

  useEffect(() => {
    const cards = (products as Array<AnyObject>).map(data => {
      const { product, product_link } = data
      const props = product ? data : { product: data, product_link }

      return props as ProductCardProps
    })

    setCards(cards)
  }, [products, setCards])

  return (
    <Row {...mutated}>
      {cards.map(card => {
        return (
          <Column key={card.product.product_id}>
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
