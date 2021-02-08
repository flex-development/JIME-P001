import type {
  IProductImage,
  IProductListing,
  IProductListingVariant
} from '@flex-development/kustomzcore'
import findIndex from 'lodash/findIndex'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import merge from 'lodash/merge'
import uniq from 'lodash/uniq'
import stripHtml from 'string-strip-html'
import { DEFAULT_SEO_IMAGE_DATA } from '../../config/constants'
import type { SEOData } from '../../types'

/**
 * @file Implementation - productSEO
 * @module lib/utils/seo/productSEO
 */

/**
 * Returns an object with SEO data for a product listing resource.
 *
 * @param listing - Product listing data
 * @param sku - SKU of variant to generate SEO for (optional)
 */
const productSEO = async (
  listing: IProductListing | Promise<IProductListing>,
  sku: IProductListingVariant['sku'] = ''
): Promise<SEOData> => {
  listing = await listing
  const { available, images = [], vendor } = listing

  // Initialize SEO object
  let seo: SEOData = {
    description: stripHtml(listing.body_html).result,
    keywords: join(uniq(listing.tags.trim().split(',')), ''),
    twitter: { card: 'summary' }
  }

  if (listing.variants.length) {
    // Get index of active variant
    let active = 0
    if (!isEmpty(sku)) active = findIndex(listing.variants, v => v.sku === sku)

    // Get active product variant
    const variant = listing.variants[active < 0 ? 0 : active]
    const { image_id } = variant

    // Get SEO title
    const title = `${listing.title} - ${variant.title}`

    // Get product variant image
    let variant_img = images.find(({ id }) => id === image_id)

    if (!variant_img) {
      variant_img = { ...DEFAULT_SEO_IMAGE_DATA, alt: title } as IProductImage
    }

    // Update SEO data
    seo = merge(seo, {
      og: {
        image: variant_img.src,
        'image:alt': variant_img.alt || null,
        'image:height': variant_img.height,
        'image:secure_url': variant_img.src,
        'image:width': variant_img.width,
        'product:availability': available ? `${available}` : null,
        'product:brand': vendor || null,
        'product:condition': 'new',
        'product:price:amount': variant.price,
        'product:price:currency': 'USD'
      },
      title,
      twitter: { image: variant_img.src }
    })
  } else {
    const image = images[0] || DEFAULT_SEO_IMAGE_DATA

    seo = merge(seo, {
      og: {
        image: image.src,
        'image:alt': image.alt || null,
        'image:height': image.height,
        'image:secure_url': image.src,
        'image:width': image.width,
        'product:availability': 'true',
        'product:brand': vendor || null,
        'product:condition': 'new',
        'product:price:currency': 'USD'
      },
      title: listing.title,
      twitter: { image: image.src }
    })
  }

  return seo
}

export default productSEO
