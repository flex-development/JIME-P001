import {
  IProductListing,
  IProductListingVariant
} from '@flex-development/kustomzcore/types'
import { getSizedImageUrl } from '@shopify/theme-images'
import { IMAGE_PLACEHOLDER_URL } from '@system/config/constants'
import { ImageProps } from '@system/lib/atoms/Image'

/**
 * @file Implementation - getProductImage
 * @module utils/getProductImage/impl
 */

/**
 * Returns an `ImageProps` object for a product listing variant.
 *
 * @param image_id - Variant image ID
 * @param images - Array of product listing images
 * @param alt - Image alt text
 * @return `ImageProps` object for the product listing variant
 */
const getProductImage = (
  image_id: IProductListingVariant['image_id'],
  images: IProductListing['images'],
  alt?: ImageProps['alt']
): ImageProps => {
  const image = image_id ? images.find(img => img.id === image_id) : images[0]
  const { alt: image_alt, height, id, src = '', width } = image || {}

  const url = getSizedImageUrl(src, '1024x1024') || IMAGE_PLACEHOLDER_URL
  const url_2x = getSizedImageUrl(src, '2048x2048') || IMAGE_PLACEHOLDER_URL

  return {
    alt: alt || image_alt,
    height,
    id: id ? `${id}` : undefined,
    src: src.length ? url : IMAGE_PLACEHOLDER_URL,
    srcSet: `${url} ${url_2x} 2x`,
    width
  }
}

export default getProductImage
