import type { IProductListing } from '@flex-development/kustomzcore/types'
import ProductImage from '@flex-development/kustomzcore/utils/getProductImage'
import { getSizedImageUrl } from '@shopify/theme-images'
import { IMAGE_PLACEHOLDER_URL } from '@system/config/constants'
import { useMemoCompare } from '@system/hooks/useMemoCompare'
import type { ImageProps } from '@system/lib/atoms/Image'
import { GridBreakpoints } from '@system/types'
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

      const image = ProductImage(
        variant?.image_id || null,
        images,
        !!variant?.image_id,
        {
          alt: variant ? `${title} - ${variant?.title}` : title,
          src: IMAGE_PLACEHOLDER_URL
        }
      ) as ImageProps

      const xl_dimensions = `${GridBreakpoints.xl}x${GridBreakpoints.xl}`
      const lg_dimensions = `${GridBreakpoints.lg}x${GridBreakpoints.lg}`
      const md_dimensions = `${GridBreakpoints.md}x${GridBreakpoints.md}`
      const sm_dimensions = `${GridBreakpoints.sm}x${GridBreakpoints.sm}`

      const img_responsive_xl = getSizedImageUrl(image.src, xl_dimensions)
      const img_responsive_lg = getSizedImageUrl(image.src, lg_dimensions)
      const img_responsive_md = getSizedImageUrl(image.src, md_dimensions)
      const img_responsive_sm = getSizedImageUrl(image.src, sm_dimensions)

      image.srcSet = `
        ${image.src},
        ${img_responsive_sm} (max-width: ${GridBreakpoints.sm}px),
        ${img_responsive_md} (max-width: ${GridBreakpoints.md}px),
        ${img_responsive_lg} (max-width: ${GridBreakpoints.lg}px),
        ${img_responsive_xl} (max-width: ${GridBreakpoints.xl}px)
      `.trim()

      return image
    })
  }, [_product])

  return useMemoCompare(_images)
}
