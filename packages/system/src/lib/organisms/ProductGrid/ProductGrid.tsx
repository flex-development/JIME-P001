import type { AnyObject } from '@flex-development/json/utils/types'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { GridColumn } from '@system/lib/atoms/GridColumn'
import { Section, SectionProps } from '@system/lib/atoms/Section'
import type { ProductCardProps } from '@system/lib/molecules/ProductCard'
import { ProductCard } from '@system/lib/molecules/ProductCard'
import type { FC } from 'react'
import type { ProductGridProps } from './ProductGrid.props'

/**
 * @file Implementation - ProductGrid
 * @module lib/organisms/ProductGrid/impl
 */

/**
 * Displays `ProductCard` components in a grid.
 * Renders a `Section` component with the class `product-grid`.
 */
export const ProductGrid: FC<ProductGridProps> = props => {
  const { max, products = [], ...rest } = props

  // Get component properties
  const sanitized = useSanitizedProps<'section', SectionProps>(
    rest,
    'product-grid'
  )

  // Limit number of cards to display and cast data array
  const $products = products.slice(0, max || products.length) as AnyObject[]

  return (
    <Section {...sanitized}>
      {$products.map(data => {
        const { product, product_link } = data
        const card = product ? data : { product: data, product_link }

        return (
          <GridColumn key={card.product.product_id}>
            <ProductCard {...(card as ProductCardProps)} />
          </GridColumn>
        )
      })}
    </Section>
  )
}

ProductGrid.displayName = 'ProductGrid'

ProductGrid.defaultProps = {
  products: []
}
