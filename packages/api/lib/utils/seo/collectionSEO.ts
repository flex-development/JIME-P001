import type {
  ICollectionListing,
  IProductListing
} from '@flex-development/kustomzcore/dist/types'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import merge from 'lodash/merge'
import uniq from 'lodash/uniq'
import stripHtml from 'string-strip-html'
import type { SEOData } from '../../types'
import globalSEO from './globalSEO'

/**
 * @file Implementation - collectionSEO
 * @module utils/seo/collectionSEO
 */

/**
 * Returns an object with SEO data for a collection listing resource.
 *
 * @async
 * @param listing - Collecting listing data
 * @param products - Products in collection
 */
const collectionSEO = async (
  listing: ICollectionListing | Promise<ICollectionListing>,
  products: IProductListing[] = []
): Promise<SEOData> => {
  listing = await listing

  // Get global SEO data
  const global = await globalSEO()

  // Get collection image
  const image = listing.image || listing.default_product_image || {}

  // Build keywords from product tags
  let keywords: string[] = []

  products.forEach(product => {
    keywords = keywords.concat(product.tags.trim().split(','))
  })

  keywords = uniq(keywords.concat(global.keywords?.split(',') ?? []))

  return merge(global, {
    description: stripHtml(listing.body_html).result.trim(),
    keywords: join(keywords, ','),
    og: {
      image: image.src,
      'image:alt': isEmpty(image) ? image.alt : image.alt || '',
      'image:height': isEmpty(image) ? image.height : image.height || null,
      'image:secure_url': image.src,
      'image:width': isEmpty(image) ? image.width : image.width || null
    },
    title: `Collections - ${listing.title}`,
    twitter: { image: image.src }
  })
}

export default collectionSEO
