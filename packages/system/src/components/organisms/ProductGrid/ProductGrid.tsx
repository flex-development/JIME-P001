import { AnyObject } from '@flex-development/json'
import { Column, Row, RowProps } from '@system/components/atoms'
import { ProductCard, ProductCardProps } from '@system/components/molecules'
import { useSanitizedProps } from '@system/hooks'
import { FC } from 'react'
import { IProductListing } from 'shopify-api-node'

/**
 * @file Product layout component
 * @module components/organisms/ProductGrid/impl
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
 * Renders a `Row` component with the class `product-grid`.
 */
export const ProductGrid: FC<ProductGridProps> = (props: ProductGridProps) => {
  const { products = [], ...rest } = props

  const sanitized = useSanitizedProps<typeof rest>(rest, 'product-grid')

  return (
    <Row {...sanitized}>
      {(products as Array<AnyObject>).map(data => {
        const { product, product_link } = data
        const card = product ? data : { product: data, product_link }

        return (
          <Column key={card.product.product_id}>
            <ProductCard {...(card as ProductCardProps)} />
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
