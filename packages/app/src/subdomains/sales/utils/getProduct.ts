import kapi from '@app/config/axios-kapi'
import log from '@app/config/logger'
import type { GetProductQuery, GetProductResJSON } from '@kapi/types'
import type { NotFound } from '@subdomains/app/types'

/**
 * @file Implementation - getProduct
 * @module subdomains/sales/utils/getProduct
 */

/**
 * Retrieve a product listing by handle.
 * Returns `{ notFound: true }` if the product listing isn't found.
 *
 * @async
 * @param query - Query parameters
 * @param query.handle - Handle of product listing to retrieve
 * @param query.fields - Comma-separated list of fields to show
 * @param query.sku - Generate SEO for a product listing variant
 * @throws {FeathersErrorJSON}
 */
const getProduct = async (
  query: GetProductQuery
): Promise<GetProductResJSON | NotFound> => {
  const { handle, ...params } = query

  try {
    return await kapi<GetProductResJSON>({ params, url: `/products/${handle}` })
  } catch (error) {
    log('subdomains/sales/utils/getProduct').error(error)

    if (error.code === 404) return { notFound: true }
    throw error
  }
}

export default getProduct
