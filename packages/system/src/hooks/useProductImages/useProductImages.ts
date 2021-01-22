import type { IProductListing } from '@flex-development/kustomzcore/types'
import ProductImage from '@flex-development/kustomzcore/utils/getProductImage'
import { IMAGE_PLACEHOLDER_URL } from '@system/config/constants'
import { useMemoCompare } from '@system/hooks/useMemoCompare'
import type { ImageProps } from '@system/lib/atoms/Image'
import { useMemo } from 'react'

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

      return ProductImage(
        variant?.image_id || null,
        images,
        variant?.image_id === null,
        {
          alt: variant ? `${title} - ${variant?.title}` : title,
          src: IMAGE_PLACEHOLDER_URL
        }
      ) as ImageProps
    })
  }, [_product])

  return useMemoCompare(_images)
}
