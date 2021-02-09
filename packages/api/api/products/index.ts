import type { IProductListing } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import {
  handleAPIError,
  initPathLogger,
  trackAPIEvent,
  trackAPIRequest
} from '../../lib/middleware'
import Service from '../../lib/services/ProductService'
import type { FindProductsReq as Req, GetProductQuery } from '../../lib/types'
import { includeSEO } from '../../lib/utils'

/**
 * @file API Endpoint - Find Products
 * @module api/products
 */

/**
 * Returns an array of product listing resource objects.
 *
 * @param req - API request object
 * @param req.query - Request query parameters
 * @param req.query.fields - Specify fields to include
 * @param req.query.handle - Find product by handle
 * @param req.query.hitsPerPage - Number of hits per page
 * @param req.query.length - Number of hits to retrieve (used only with offset)
 * @param req.query.offset - Specify the offset of the first hit to return
 * @param req.query.page - Specify the page to retrieve
 * @param req.query.product_id - Find product by ID
 * @param req.query.text - Search query text
 * @param res - API response object
 */
export default async (req: Req, res: Res): Promise<Res | void> => {
  // Attach `logger` and `path` to API request object
  initPathLogger(req)

  // Send `pageview` hit to Google Analytics
  await trackAPIRequest(req)

  // Convert query into search options object
  const options = Service.searchOptions(req.query)

  try {
    // Execute search and get results
    let results = await Service.find(req.query.text, options)

    // Get SEO data for each product
    if (includeSEO(options)) {
      const $results = results.map(async obj => {
        const product = obj as IProductListing
        const { sku } = req.query as GetProductQuery

        return { ...obj, seo: await Service.seo(product, sku) }
      })

      // Complete SEO data promise
      results = await Promise.all($results)
    }

    res.json(results)
  } catch (err) {
    return handleAPIError(req, res, err, { query: req.query })
  }

  // Send success `event` hit to Google Analytics
  await trackAPIEvent(req, '/products')
  return res.end()
}
