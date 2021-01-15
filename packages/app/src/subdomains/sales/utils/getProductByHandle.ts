import { DataArrayQueryParams } from '@flex-development/json/interfaces'
import { IProductListing } from '@flex-development/kustomzcore/types/shopify'
import { createError } from '@flex-development/kustomzcore/utils/createError'
import { NotFound } from '@subdomains/app/utils/types'
import debug from 'debug'
import findProducts from './findProducts'

/**
 * @file Implementation - getProductByHandle
 * @module subdomains/sales/utils/getProductByHandle
 */

/**
 * Retrieve a product by handle.
 * Returns `{ notFound: true }` if the product isn't found.
 *
 * @async
 * @param handle - Handle of product to retrieve
 */
const getProductByHandle = async (
  handle: IProductListing['handle']
): Promise<IProductListing | NotFound> => {
  const query: DataArrayQueryParams = { handle: { $eq: handle } }
  const products = await findProducts(query)

  if (!products.length) {
    const data = { errors: { handle } }
    const message = `Product with handle "${handle}" not found`
    const error = createError(message, data, 404)

    debug('subdomains/sales/utils/getProductByHandle')(error)
    return { notFound: true }
  }

  return products[0] as IProductListing
}

export default getProductByHandle
