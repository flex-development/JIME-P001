import kapi from '@app/config/axios-kapi'
import log from '@app/config/logger'
import type { GetPageQuery, GetPageResJSON } from '@kapi/types'
import type { NotFound } from '@subdomains/app/types'

/**
 * @file Implementation - getPage
 * @module subdomains/cms/utils/getPage
 */

/**
 * Retrieve a page by handle.
 * Returns `{ notFound: true }` if the page isn't found.
 *
 * @async
 * @param query - Query parameters
 * @param query.handle - Handle of page to retrieve
 * @param query.fields - Comma-separated list of fields to show
 */
const getPage = async (
  query: GetPageQuery
): Promise<GetPageResJSON | NotFound> => {
  const { handle, ...params } = query

  try {
    return await kapi<GetPageResJSON>({ params, url: `/pages/${handle}` })
  } catch (error) {
    log('subdomains/cms/utils/getPage').error(error)
    return { notFound: true }
  }
}

export default getPage
