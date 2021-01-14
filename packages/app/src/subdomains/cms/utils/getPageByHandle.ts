import { PartialOr } from '@flex-development/json/utils/types'
import Logger from '@flex-development/kustomzcore/config/logger'
import { IPage } from '@flex-development/kustomzcore/types/shopify'
import { createError } from '@flex-development/kustomzcore/utils/createError'
import { NotFound } from '@subdomains/app/utils/types'
import { FindPageParams } from '@subdomains/cms/utils/types'
import pick from 'lodash/pick'
import findPages from './findPages'

/**
 * @file Implementation - getPageByHandle
 * @module subdomains/cms/utils/getPageByHandle
 */

/**
 * Retrieve a page by handle.
 * Returns `{ notFound: true }` if the collection isn't found
 *
 * @async
 * @param handle - Handle of page to find
 * @param params - Query parameters
 * @param params.fields - Comma-separated list of fields to show
 */
const getPageByHandle = async (
  handle: IPage['handle'],
  params?: Pick<FindPageParams, 'fields'>
): Promise<PartialOr<IPage> | NotFound> => {
  const pages = await findPages({ ...pick(params, ['fields']), handle })

  if (!pages.length) {
    const data = { errors: { handle } }
    const message = `Page with handle "${handle}" not found`
    const error = createError(message, data, 404)

    Logger.error({ getPageByHandle: error })
    return { notFound: true }
  }

  return pages[0]
}

export default getPageByHandle
