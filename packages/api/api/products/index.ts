import { createError, IProductListing } from '@flex-development/kustomzcore'
import { VercelResponse as Res } from '@vercel/node'
import debug from 'debug'
import omit from 'lodash/omit'
import type { IProductListing as Hit } from 'shopify-api-node'
import { ALGOLIA, INDEX_SETTINGS, SHOPIFY } from '../../lib/config'
import type {
  FindCollectionsReq as Req,
  GetProductQuery
} from '../../lib/types'
import {
  findProductsOptions,
  productMetafields,
  productSEO
} from '../../lib/utils'

/**
 * @file API Endpoint - Find Products
 * @module api/products
 */

const PRODUCTS = SHOPIFY.productListing

export default async ({ query }: Req, res: Res): Promise<Res> => {
  // Convert product query into search options object
  const options = findProductsOptions(query)

  try {
    // Get product listings to update search index
    let listings: Hit[] | Promise<Hit>[] = await PRODUCTS.list()

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
    listings = listings.map(async hit => ({
      ...hit,
      seo: productSEO(hit as IProductListing, (query as GetProductQuery).sku)
    }))

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
    const error = createError(err, { options, query }, err.status)

    debug('api/products')(error)
    return res.status(error.code).json(error)
  }
}
