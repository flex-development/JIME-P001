import type { AnyObject } from '@flex-development/json/utils/types'
import type { IProductListing } from '@kustomzcore/types'
import { useMemoCompare } from '@system/hooks/useMemoCompare'
import type { ProductCardProps } from '@system/lib/molecules/ProductCard'

/**
 * @file Implementation - useProductCards
 * @module hooks/useProductCards/impl
 */

/**
 * Returns an array of `ProductCard` data.
 *
 * @param {IProductListing[] | ProductCardProps[]} [products] - Product data
 * @return {ProductCardProps[]} Array of `ProductCard` component properties
 */
export const useProductCards = (
  products: IProductListing[] | ProductCardProps[] = []
): ProductCardProps[] => {
  const cards = (products as AnyObject[]).map(data => {
    const { product, product_link } = data
    return product ? data : { product: data, product_link }
  })

  return useMemoCompare<ProductCardProps[]>(cards as ProductCardProps[])
}
