import { DataArrayQueryParams } from '@flex-development/json/interfaces'
import { IProductListing } from '@flex-development/kustomzcore/types/shopify'
import { createError } from '@flex-development/kustomzcore/utils/createError'
import debug from 'debug'
import findProducts from './findProducts'

/**
 * @file Implementation - getProduct
 * @module subdomains/sales/utils/getProduct
 */

/**
 * Retrieve a product by ID. Throws an error if the product listing isn't found.
 *
 * @async
 * @param id - ID of product to retrieve
 * @throws {FeathersErrorJSON}
 */
const getProduct = async (
  id: IProductListing['product_id']
): Promise<IProductListing> => {
  const query: DataArrayQueryParams = { product_id: { $eq: id } }
  const products = await findProducts(query)

  if (!products.length) {
    const data = { errors: { id } }
    const error = createError(`Product with id "${id}" not found`, data, 404)

    debug('subdomains/sales/utils/getProduct')(error)
    throw error
  }

  return products[0] as IProductListing
}

export default getProduct
