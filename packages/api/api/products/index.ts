import {
  createError,
  IProductListing as Hit
} from '@flex-development/kustomzcore'
import { VercelResponse as Res } from '@vercel/node'
import debug from 'debug'
import omit from 'lodash/omit'
import { ALGOLIA, INDEX_SETTINGS, SHOPIFY } from '../../lib/config'
import type { FindCollectionsReq as Req } from '../../lib/types'
import {
  findProductsOptions,
  includeMetafields,
  productMetafields
} from '../../lib/utils'

/**
 * @file API Endpoint - Find Products
 * @module api/products
 */

export default async ({ query }: Req, res: Res): Promise<Res> => {
  // Convert product query into search options object
  const options = findProductsOptions(query)

  try {
    // Initialize search index
    const index = ALGOLIA.initIndex(INDEX_SETTINGS.product_listings.name)

    // Set index settings
    index.setSettings(omit(INDEX_SETTINGS.product_listings, ['name']))

    // Get product listings to update index
    let listings = await SHOPIFY.productListing.list()

    // Keep objectID consistent with product listing ID
    listings = listings.map(obj => ({ ...obj, objectID: obj.product_id }))

    // Update index data
    await index.saveObjects(listings)

    // Perform search
    const { hits } = await index.search<Hit>(query?.text ?? '', options)
    let payload: Hit[] | Promise<Hit>[] = []

    // Get metafields for each product + remove objectID field
    if (includeMetafields(options)) {
      payload = hits.map(async hit => ({
        ...omit(hit, ['objectID']),
        metafield: await productMetafields(hit.product_id)
      }))

      payload = await Promise.all(payload)
    } else {
      payload = hits.map(hit => omit(hit, ['objectID']))
    }

    return res.json(payload)
  } catch (err) {
    const error = createError(err, { options, query }, err.status)

    debug('api/products')(error)
    return res.status(error.code).json(error)
  }
}
