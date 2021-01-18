import {
  createError,
  ICollectionListing as Hit
} from '@flex-development/kustomzcore'
import { VercelResponse as Res } from '@vercel/node'
import debug from 'debug'
import { ALGOLIA, SHOPIFY } from '../../lib/config'
import type { FindCollectionsReq as Req } from '../../lib/types'
import { findCollectionsOptions } from '../../lib/utils'

/**
 * @file API Endpoint - Find Collections
 * @module api/collections
 */

export default async ({ query }: Req, res: Res): Promise<Res> => {
  // Convert collection query into search options object
  const options = findCollectionsOptions(query)

  try {
    // Initialize search index
    const index = ALGOLIA.initIndex('collection_listings')

    // Get collection listings to update index
    const listings = await SHOPIFY.collectionListing.list()

    // Update index data
    await index.clearObjects()
    await index.saveObjects(listings, { autoGenerateObjectIDIfNotExist: true })

    // Perform search
    const { hits } = await index.search<Hit>(query?.text ?? '', options)

    return res.json(hits)
  } catch (err) {
    const error = createError(err, { options, query })

    debug('api/collections')(error)
    return res.status(error.code).json(error)
  }
}
