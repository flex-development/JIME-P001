import { DataArrayQueryParams } from '@flex-development/json/interfaces'
import Logger from '@flex-development/kustomzcore/config/logger'
import { ICollectionListing } from '@flex-development/kustomzcore/types/shopify'
import { createError } from '@flex-development/kustomzcore/utils/createError'
import { NotFound } from '@subdomains/app/utils/types'
import findCollections from './findCollections'

/**
 * @file Implementation - getCollectionByHandle
 * @module subdomains/sales/utils/getCollectionByHandle
 */

/**
 * Retrieve a collection by handle.
 * Returns `{ notFound: true }` if the collection isn't found.
 *
 * @async
 * @param handle - Handle of collection to retrieve
 */
const getCollectionByHandle = async (
  handle: ICollectionListing['handle']
): Promise<ICollectionListing | NotFound> => {
  const query: DataArrayQueryParams = { handle: { $eq: handle } }
  const collections = await findCollections(query)

  if (!collections.length) {
    const data = { errors: { handle } }
    const message = `Collection with handle "${handle}" not found`
    const error = createError(message, data, 404)

    Logger.error({ getCollectionByHandle: error })
    return { notFound: true }
  }

  return collections[0] as ICollectionListing
}

export default getCollectionByHandle
