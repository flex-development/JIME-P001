import { DataArrayQueryParams } from '@flex-development/json/interfaces'
import Logger from '@flex-development/kustomzcore/config/logger'
import { ICollectionListing } from '@flex-development/kustomzcore/types/shopify'
import { createError } from '@flex-development/kustomzcore/utils/createError'
import findCollections from './findCollections'

/**
 * @file Implementation - getCollection
 * @module subdomains/sales/utils/getCollection
 */

/**
 * Retrieve a collection by ID. Throws an error if the collection isn't found.
 *
 * @async
 * @param id - ID of collection to retrieve
 * @throws {FeathersErrorJSON}
 */
const getCollection = async (
  id: ICollectionListing['collection_id']
): Promise<ICollectionListing> => {
  const query: DataArrayQueryParams = { collection_id: { $eq: id } }
  const collections = await findCollections(query)

  if (!collections.length) {
    const data = { errors: { id } }
    const error = createError(`Collection with id ${id} not found`, data, 404)

    Logger.error({ getCollection: error })
    throw error
  }

  return collections[0] as ICollectionListing
}

export default getCollection
