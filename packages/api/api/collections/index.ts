import type { AnyObject } from '@flex-development/json'
import type {
  ICollectionListing as Hit,
  ShopifyAPIResponses as SAR
} from '@flex-development/kustomzcore'
import { createError } from '@flex-development/kustomzcore'
import { VercelResponse as Res } from '@vercel/node'
import debug from 'debug'
import omit from 'lodash/omit'
import {
  ALGOLIA,
  axiosShopify,
  INDEX_SETTINGS,
  SHOPIFY
} from '../../lib/config'
import type { FindCollectionsReq as Req } from '../../lib/types'
import {
  collectionMetafields,
  collectionSEO,
  findCollectionsOptions,
  includeMetafields,
  includeProducts,
  includeSEO
} from '../../lib/utils'

/**
 * @file API Endpoint - Find Collections
 * @module api/collections
 */

export default async ({ query }: Req, res: Res): Promise<Res> => {
  // Convert collection query into search options object
  const options = findCollectionsOptions(query)

  try {
    // Initialize search index
    const index = ALGOLIA.initIndex(INDEX_SETTINGS.collection_listings.name)

    // Set index settings
    index.setSettings(omit(INDEX_SETTINGS.collection_listings, ['name']))

    // Get collection listings to update index
    let listings = await SHOPIFY.collectionListing.list()

    // Keep objectID consistent with collection listing ID
    listings = listings.map(obj => ({ ...obj, objectID: obj.collection_id }))

    // Update index data
    await index.saveObjects(listings)

    // Perform search
    const { hits } = await index.search<Hit>(query?.text ?? '', options)
    let payload: Hit[] | Promise<Hit>[] = hits

    // Because product data is required to fetch SEO data, check for either
    if (includeProducts(options) || includeSEO(options)) {
      // Get products for each collection
      payload = payload.map(async hit => {
        const { product_listings } = await axiosShopify<SAR.ProductListing>({
          method: 'get',
          params: { collection_id: hit.collection_id, limit: 250 },
          url: 'product_listings'
        })

        return { ...hit, products: product_listings }
      })

      // Complete products promise
      payload = await Promise.all(payload)

      // Get SEO data for each collection
      if (includeSEO(options)) {
        payload = payload.map(async hit => {
          const collection = (hit as unknown) as Hit
          const products = (hit as AnyObject).products

          return { ...hit, seo: await collectionSEO(collection, products) }
        })

        payload = await Promise.all(payload)
      }
    }

    // Get metafields for each collection
    if (includeMetafields(options)) {
      payload = payload.map(async hit => ({
        ...hit,
        metafield: await collectionMetafields(hit.collection_id)
      }))

      payload = await Promise.all(payload)
    }

    return res.json(payload.map(data => omit(data, ['objectID'])))
  } catch (err) {
    const error = createError(err, { options, query }, err.status)

    debug('api/collections')(error)
    return res.status(error.code).json(error)
  }
}
