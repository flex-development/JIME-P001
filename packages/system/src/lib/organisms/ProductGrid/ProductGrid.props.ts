import { IProductListing } from '@flex-development/kustomzcore'
import { SectionProps } from '@system/lib/atoms'
import { ProductCardProps } from '@system/lib/molecules'

/**
 * @file Implementation - ProductGrid
 * @module lib/organisms/ProductGrid
 */

export interface ProductGridProps extends SectionProps {
  /**
   * Array of product listings or product card data.
   *
   * @default []
   */
  products?: IProductListing[] | ProductCardProps[]
}
