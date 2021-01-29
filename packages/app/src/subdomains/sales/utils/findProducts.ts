import kapi from '@app/config/axios-kapi'
import log from '@app/config/logger'
import type {
  FindProductsQuery as Params,
  GetProductResJSON
} from '@kapi/types'

/**
 * @file Implementation - findProducts
 * @module subdomains/sales/utils/findProducts
 */

/**
 * Returns an array of product listing data.
 *
 * @async
 * @param params - Query parameters
 * @param params.fields - Comma-separated list of product fields to include
 * @param params.handle - Find product listing by product handle
 * @param params.hitsPerPage - Nnumber of hits per page
 * @param params.length -  Number of hits to retrieve (used only with offset)
 * @param params.offset - Specify the offset of the first hit to return
 * @param params.page - Specify the page to retrieve
 * @param params.product_id - Find product listing by product ID
 * @param params.text - Text to search in product_listings index
 */
const findProducts = async (params?: Params): Promise<GetProductResJSON[]> => {
  try {
    return await kapi<GetProductResJSON[]>({ params, url: 'products' })
  } catch (error) {
    log('subdomains/sales/utils/findProducts').error(error)
    throw error
  }
}

export default findProducts
