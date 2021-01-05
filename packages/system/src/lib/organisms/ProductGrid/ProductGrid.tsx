import { useProductCards, useSanitizedProps } from '@system/hooks'
import { GridColumn, Section, SectionProps } from '@system/lib/atoms'
import { ProductCard } from '@system/lib/molecules'
import { FC } from 'react'
import { ProductGridProps } from './ProductGrid.props'

/**
 * @file Implementation - ProductGrid
 * @module lib/organisms/ProductGrid/impl
 */

/**
 * Displays `ProductCard` components in a grid.
 * Renders a `Section` component with the class `product-grid`.
 */
export const ProductGrid: FC<ProductGridProps> = props => {
  const { products = [], ...rest } = props

  // Get product cards
  const cards = useProductCards(products)

  // Get component properties
  const sanitized = useSanitizedProps<'section', SectionProps>(
    rest,
    'product-grid'
  )

  return (
    <Section {...sanitized}>
      {cards.map(card => (
        <GridColumn key={card.product.product_id}>
          <ProductCard {...card} />
        </GridColumn>
      ))}
    </Section>
  )
}

ProductGrid.displayName = 'ProductGrid'

ProductGrid.defaultProps = {
  products: []
}
