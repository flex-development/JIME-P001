import type { AnyObject } from '@flex-development/json'
import type {
  ICollectionListing as Hit,
  ShopifyAPIResponses as SAR
} from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import omit from 'lodash/omit'
import {
  axiosShopify,
  COLLECTION_LISTINGS,
  INDEX_SETTINGS
} from '../../lib/config'
import { initPathLogger } from '../../lib/middleware'
import type { FindCollectionsReq as Req } from '../../lib/types'
import {
  collectionMetafields,
  collectionSEO,
  findCollectionsOptions,
  formatError,
  getSearchIndex
} from '../../lib/utils'

/**
 * @file API Endpoint - Find Collections
 * @module api/collections
 */

export default async (req: Req, res: Res): Promise<Res> => {
  // ! Attach `logger` and `path` to API request object
  initPathLogger(req)

  // Convert collection query into search options object
  const options = findCollectionsOptions(req.query)

  try {
    // Get collection listings to update search index
    let listings: Hit[] | Promise<Hit>[] = await COLLECTION_LISTINGS.list()

    // Keep objectID consistent with collection listing ID
    listings = listings.map(obj => ({ ...obj, objectID: obj.collection_id }))

    // Get metafields for each collection
    listings = listings.map(async hit => ({
      ...hit,
      metafield: await collectionMetafields(hit.collection_id)
    }))

    // Complete metafields promise
    listings = await Promise.all(listings)

    // Get products for each collection
    listings = listings.map(async hit => {
      const { product_listings } = await axiosShopify<SAR.ProductListing>({
        method: 'get',
        params: { collection_id: hit.collection_id, limit: 250 },
        url: 'product_listings'
      })

      return { ...hit, products: product_listings }
    })

    // Complete products promise
    listings = await Promise.all(listings)

    // Get SEO data for each collection
    listings = listings.map(async hit => {
      const collection = (hit as unknown) as Hit
      const products = (hit as AnyObject).products

      return { ...hit, seo: await collectionSEO(collection, products) }
    })

    // Complete SEO data promise
    listings = await Promise.all(listings)

    // Get empty search index
    const index = await getSearchIndex(INDEX_SETTINGS.collection_listings.name)

    // Update index data
    await index.saveObjects(listings)

    // Perform search
    const { hits } = await index.search<Hit>(req.query?.text ?? '', options)

    // Return results and remove `objectID` field
    return res.json(hits.map(data => omit(data, ['objectID'])))
  } catch (err) {
    const error = formatError(err, { options, query: req.query })
    const { search_index_404 } = error.data

    if (!search_index_404) req.logger.error({ error })
    return search_index_404 ? res.json([]) : res.status(error.code).json(error)
  }
}
