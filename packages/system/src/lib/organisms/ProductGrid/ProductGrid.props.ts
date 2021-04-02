import type { ProductListingData } from '@kustomzcore/types'
import type { SectionProps } from '@system/lib/atoms/Section'
import type { ProductCardProps } from '@system/lib/molecules/ProductCard'

/**
 * @file Implementation - ProductGrid
 * @module lib/organisms/ProductGrid
 */

export interface ProductGridProps extends SectionProps {
  /**
   * Maximum number of `ProductCard` components to display in grid.
   */
  max?: number

  /**
   * Array of product listings or product card data.
   *
   * @default []
   */
  products?: ProductListingData[] | ProductCardProps[]
}
