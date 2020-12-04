import { ImageProps } from '@system/components'
import { IProductListing, IProductListingVariant } from 'shopify-api-node'

/**
 * @file Get `ImageProps` for a Product Listing Variant
 * @module utils/getProductVariantImage
 */

/**
 * Returns an `ImageProps` object for the product listing variant with the
 * image_id {@param image_id}.
 *
 * @param image_id - Variant image ID
 * @param images - Array of product listing images
 * @param alt - Image alt text
 * @returns `ImageProps` object for the product listing variant
 */
const getProductVariantImage = (
  image_id: IProductListingVariant['image_id'],
  images: IProductListing['images'],
  alt?: ImageProps['alt']
): ImageProps => {
  const image = image_id ? images.find(img => img.id === image_id) : images[0]

  return {
    alt: alt || image?.alt,
    height: image?.height,
    id: image ? `${image.id}` : undefined,
    src: image?.src,
    width: image?.width
  }
}

export default getProductVariantImage
