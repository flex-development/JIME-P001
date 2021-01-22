import type { IProductListing } from '@flex-development/kustomzcore'
import { createError } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import debug from 'debug'
import omit from 'lodash/omit'
import type { IProductListing as Hit } from 'shopify-api-node'
import { ALGOLIA, INDEX_SETTINGS, PRODUCT_LISTINGS } from '../../lib/config'
import type {
  FindCollectionsReq as Req,
  GetProductQuery
} from '../../lib/types'
import {
  findProductsOptions,
  isSearchIndex404Error,
  productMetafields,
  productSEO
} from '../../lib/utils'

/**
 * @file API Endpoint - Find Products
 * @module api/products
 */

export default async ({ query }: Req, res: Res): Promise<Res> => {
  // Convert product query into search options object
  const options = findProductsOptions(query)

  try {
    // Get product listings to update search index
    let listings: Hit[] | Promise<Hit>[] = await PRODUCT_LISTINGS.list()

    // Keep objectID consistent with product listing ID
    listings = listings.map(obj => ({ ...obj, objectID: obj.product_id }))

    // Get metafields for each product
    listings = listings.map(async hit => ({
      ...hit,
      metafield: await productMetafields(hit.product_id)
    }))

    // Complete metafields promise
    listings = await Promise.all(listings)

    // Get SEO data for each product
    listings = listings.map(async hit => {
      const product = hit as IProductListing

      return {
        ...hit,
        seo: await productSEO(product, (query as GetProductQuery).sku)
      }
    })

    // Complete SEO data promise
    listings = await Promise.all(listings)

    // Initialize search index
    const index = ALGOLIA.initIndex(INDEX_SETTINGS.product_listings.name)

    // Set index settings
    index.setSettings(omit(INDEX_SETTINGS.product_listings, ['name']))

    // Update index data
    await index.saveObjects(listings)

    // Perform search
    const { hits } = await index.search<Hit>(query?.text ?? '', options)

    // Return results and remove `objectID` field
    return res.json(hits.map(data => omit(data, ['objectID'])))
  } catch (err) {
    const index404 = isSearchIndex404Error(err)
    let error = err

    if (!err.className) error = createError(err, { options, query }, err.status)

    debug('api/products')(error)
    return index404 ? res.json([]) : res.status(error.code).json(error)
  }
}
