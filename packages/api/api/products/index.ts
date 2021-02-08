import type { IProductListing } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import omit from 'lodash/omit'
import type { IProductListing as Hit } from 'shopify-api-node'
import { INDEX_SETTINGS, PRODUCT_LISTINGS } from '../../lib/config'
import { initPathLogger } from '../../lib/middleware'
import type {
  FindCollectionsReq as Req,
  GetProductQuery
} from '../../lib/types'
import {
  findProductsOptions,
  formatError,
  getSearchIndex,
  includeMetafields,
  includeSEO,
  productMetafields,
  productSEO
} from '../../lib/utils'

/**
 * @file API Endpoint - Find Products
 * @module api/products
 */

export default async (req: Req, res: Res): Promise<Res> => {
  // ! Attach `logger` and `path` to API request object
  initPathLogger(req)

  // Convert product query into search options object
  const options = findProductsOptions(req.query)

  try {
    // Get product listings to update search index
    let listings: Hit[] | Promise<Hit>[] = await PRODUCT_LISTINGS.list()

    // Keep objectID consistent with product listing ID
    listings = listings.map(obj => ({ ...obj, objectID: obj.product_id }))

    // Get metafields for each product
    if (includeMetafields(options)) {
      listings = listings.map(async hit => ({
        ...hit,
        metafield: await productMetafields(hit.product_id)
      }))

      // Complete metafields promise
      listings = await Promise.all(listings)
    }

    // Get SEO data for each product
    if (includeSEO(options)) {
      listings = listings.map(async hit => {
        const product = hit as IProductListing

        return {
          ...hit,
          seo: await productSEO(product, (req.query as GetProductQuery).sku)
        }
      })

      // Complete SEO data promise
      listings = await Promise.all(listings)
    }

    // Get empty search index
    const index = await getSearchIndex(INDEX_SETTINGS.product_listings.name)

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
