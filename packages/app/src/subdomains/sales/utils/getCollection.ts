import kapi from '@app/config/axios-kapi'
import log from '@app/config/logger'
import type { GetCollectionQuery, GetCollectionResJSON } from '@kapi/types'
import type { NotFound } from '@subdomains/app/types'

/**
 * @file Implementation - getCollection
 * @module subdomains/sales/utils/getCollection
 */

/**
 * Retrieve a collection listing by handle.
 * Returns `{ notFound: true }` if the collection listing isn't found.
 *
 * @async
 * @param query - Query parameters
 * @param query.handle - Handle of collection listing to retrieve
 * @param query.fields - Comma-separated list of fields to show
 * @throws {FeathersErrorJSON}
 */
const getCollection = async (
  query: GetCollectionQuery
): Promise<GetCollectionResJSON | NotFound> => {
  const { handle, ...params } = query

  try {
    return await kapi<GetCollectionResJSON>({
      params,
      url: `/collections/${handle}`
    })
  } catch (error) {
    log('subdomains/cms/utils/getCollection').error(error)

    if (error.code === 404) return { notFound: true }
    throw error
  }
}

export default getCollection
