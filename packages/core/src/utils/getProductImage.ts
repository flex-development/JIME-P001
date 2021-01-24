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
 */
const getProductImage = (
  image_id: IProductListingVariant['image_id'] = null,
  images: IProductListing['images'] = [],
  sized = true,
  fallback: Image = {}
): Image => {
  const image = image_id ? images.find(img => img.id === image_id) : fallback
  const { alt: image_alt, height, id, src = '', width } = image as Image

  let url = (sized ? getSizedImageUrl(src, '1024x1024') : src) as string
  let url_2x = (sized ? getSizedImageUrl(src, '2048x2048') : src) as string

  url = url.split('?')[0]
  url_2x = url_2x.split('?')[0]

  return {
    alt: !isEmpty(image_alt) ? image_alt : undefined,
    height,
    id: id ? `${id}` : undefined,
    src: getSizedImageUrl(src, 'master') || fallback.src,
    srcSet: `${url}, ${url_2x} 2x`,
    width
  }
}

export default getProductImage
