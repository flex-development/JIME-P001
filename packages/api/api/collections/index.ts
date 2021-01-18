import {
  createError,
  ICollectionListing as Hit
} from '@flex-development/kustomzcore'
import { VercelResponse as Res } from '@vercel/node'
import debug from 'debug'
import omit from 'lodash/omit'
import { ALGOLIA, INDEX_SETTINGS, SHOPIFY } from '../../lib/config'
import type { FindCollectionsReq as Req } from '../../lib/types'
import { collectionMetafields, findCollectionsOptions } from '../../lib/utils'

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

    // Get metafields for each collection + remove objectID field
    const payload = hits.map(async hit => ({
      ...omit(hit, ['objectID']),
      metafield: await collectionMetafields(hit.collection_id)
    }))

    return res.json(await Promise.all(payload))
  } catch (err) {
    const error = createError(err, { options, query }, err.status)

    debug('api/collections')(error)
    return res.status(error.code).json(error)
  }
}
