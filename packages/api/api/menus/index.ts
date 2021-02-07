import type {
  ShopifyAPIResponses as SAR,
  ShopifyMenu as Hit
} from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import omit from 'lodash/omit'
import { axiosShopify, INDEX_SETTINGS } from '../../lib/config'
import { initPathLogger } from '../../lib/middleware'
import type { FindMenusReq as Req } from '../../lib/types'
import {
  formatError,
  getSearchIndex,
  shopifySearchOptions
} from '../../lib/utils'

/**
 * @file API Endpoint - Find Menus
 * @module api/menus
 */

export default async (req: Req, res: Res): Promise<Res> => {
  // ! Attach `logger` and `path` to API request object
  initPathLogger(req)

  // Convert menus query into search options object
  const options = shopifySearchOptions(req.query)

  try {
    // Get menus to update search index
    let menus = (await axiosShopify<SAR.Menus>({}, true)).menus || []

    // Keep objectID consistent with menu handle
    menus = menus.map(obj => ({ ...obj, objectID: obj.handle }))

    // Get empty search index
    const index = await getSearchIndex(INDEX_SETTINGS.menus.name)

    // Update index data
    await index.saveObjects(menus)

    // Perform search
    const { hits } = await index.search<Hit>(req.query?.text ?? '', options)

    // Return results and remove `objectID` field
    return res.json(hits.map(data => omit(data, ['objectID'])))
  } catch (err) {
    const error = formatError(err, { options, query: req.query })
    const { search_index_404 } = error.data

    if (!search_index_404) req.logger.error({ error })
    return search_index_404 ? res.json([]) : res.status(error.code).json(error)
  }
}
