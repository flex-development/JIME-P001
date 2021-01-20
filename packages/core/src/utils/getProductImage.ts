import { getSizedImageUrl } from '@shopify/theme-images'
import isEmpty from 'lodash/isEmpty'
import type { ImgHTMLAttributes } from 'react'
import type { IProductListing, IProductListingVariant } from '../types'

/**
 * @file Implementation - getProductImage
 * @module utils/getProductImage
 */

type Image = ImgHTMLAttributes<HTMLImageElement>

/**
 * Returns an `ImgHTMLAttributes` object for a product listing variant.
 *
 * @param image_id - Variant image ID
 * @param images - Array of product listing images
 * @param sized - If true, retrieve sized image URLs
 * @param fallback - Fallback image options
 * @param fallback.alt - Image alt text
 * @param fallback.src - Fallback image source
 * @return `ImgHTMLAttributes` object for selected variant
 */
const getProductImage = (
  image_id: IProductListingVariant['image_id'] = null,
  images: IProductListing['images'] = [],
  sized = true,
  fallback: Image = {}
): Image => {
  const image = image_id ? images.find(img => img.id === image_id) : fallback
  const { alt: image_alt, height, id, src = '', width } = image as Image

  let url = sized ? getSizedImageUrl(src, '1024x1024') : src
  let url_2x = sized ? getSizedImageUrl(src, '2048x2048') : src

  if (sized && !url.startsWith('https')) url = `https${url}`
  if (sized && !url_2x.startsWith('https')) url_2x = `https${url_2x}`

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
