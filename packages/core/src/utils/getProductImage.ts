import { getSizedImageUrl } from '@shopify/theme-images'
import isEmpty from 'lodash/isEmpty'
import type { ImgHTMLAttributes } from 'react'
import type { IProductListing, IProductListingVariant } from '../types'

/**
 * @file Implementation - getProductImage
 * @module utils/getProductImage
 */

/**
 * Returns an `ImgHTMLAttributes` object for a product listing variant.
 *
 * @param image_id - Variant image ID
 * @param images - Array of product listing images
 * @param fallback - Fallback image options
 * @param fallback.alt - Image alt text
 * @param fallback.src - Fallback image source
 * @return `ImgHTMLAttributes` object for selected variant
 */
const getProductImage = (
  image_id: IProductListingVariant['image_id'],
  images: IProductListing['images'],
  fallback: {
    alt?: ImgHTMLAttributes<HTMLImageElement>['alt']
    src: ImgHTMLAttributes<HTMLImageElement>['src']
  }
): ImgHTMLAttributes<HTMLImageElement> => {
  const image = image_id ? images.find(img => img.id === image_id) : images[0]
  const { alt: image_alt, height, id, src = '', width } = image || {}

  const url = getSizedImageUrl(src, '1024x1024') || fallback.src
  const url_2x = getSizedImageUrl(src, '2048x2048') || fallback.src

  return {
    alt: !isEmpty(image_alt) ? image_alt || undefined : fallback.alt,
    height,
    id: id ? `${id}` : undefined,
    src: src.length ? url : fallback,
    srcSet: `${url} ${url_2x} 2x`,
    width
  }
}

export default getProductImage
