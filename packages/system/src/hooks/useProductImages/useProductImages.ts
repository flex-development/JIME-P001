import { IProductListing } from '@flex-development/kustomzcore'
import { ImageProps } from '@system/lib/atoms/Image'
import { getProductImage } from '@system/utils'
import { useMemo } from 'react'
import { useMemoCompare } from '../useMemoCompare'

/**
 * @file Implementation - useProductImages
 * @module hooks/useProductImages/impl
 */

/**
 * Returns an array of product images an array of `Image` component properties.
 *
 * @param product - Product listing
 */
export const useProductImages = (product?: IProductListing): ImageProps[] => {
  // Get product listing reference
  const _product = useMemoCompare<typeof product>(product)

  // Get product images
  const _images = useMemo<ImageProps[]>(() => {
    // If no product, do nothing
    if (!_product) return []

    const { images, title, variants } = _product

    return images.map(({ id }) => {
      const variant = variants.find(({ image_id }) => image_id === id)

      return getProductImage(
        variant?.image_id || null,
        images,
        variant ? `${title} - ${variant?.title}` : title
      )
    })
  }, [_product])

  return useMemoCompare(_images)
}
