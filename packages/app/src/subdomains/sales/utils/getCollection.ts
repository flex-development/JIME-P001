import kapi from '@app/config/axios-kapi'
import type { GetCollectionQuery, GetCollectionResJSON } from '@kapi/types'
import type { NotFound } from '@subdomains/app/types'
import debug from 'debug'

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
    debug('subdomains/cms/utils/getCollection')(error)
    return { notFound: true }
  }
}

export default getCollection
