import { AnyObject } from '@flex-development/json/utils/types'
import { IProductListing } from '@flex-development/kustomzcore/types'
import { useMemoCompare } from '@system/hooks/useMemoCompare'
import { ProductCardProps } from '@system/lib/molecules/ProductCard'

/**
 * @file Implementation - useProductCards
 * @module hooks/useProductCards/impl
 */

/**
 * Returns an array of `ProductCard` data.
 *
 * @param products - Array of product listings or `ProductCard` props
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
