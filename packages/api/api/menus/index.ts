import type {
  ShopifyAPIResponses as SAR,
  ShopifyMenu as Hit
} from '@flex-development/kustomzcore'
import { createError } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import debug from 'debug'
import omit from 'lodash/omit'
import { ALGOLIA, axiosShopify, INDEX_SETTINGS } from '../../lib/config'
import type { FindMenusReq as Req } from '../../lib/types'
import { isSearchIndex404Error, shopifySearchOptions } from '../../lib/utils'

/**
 * @file API Endpoint - Find Menus
 * @module api/menus
 */

export default async ({ query }: Req, res: Res): Promise<Res> => {
  // Convert menus query into search options object
  const options = shopifySearchOptions(query)

  try {
    // Get menus to update search index
    let menus = (await axiosShopify<SAR.Menus>({}, true)).menus || []

    // Keep objectID consistent with menu handle
    menus = menus.map(obj => ({ ...obj, objectID: obj.handle }))

    // Initialize search index
    const index = ALGOLIA.initIndex(INDEX_SETTINGS.menus.name)

    // Set index settings
    index.setSettings(omit(INDEX_SETTINGS.menus, ['name']))

    // Update index data
    await index.saveObjects(menus)

    // Perform search
    const { hits } = await index.search<Hit>(query?.text ?? '', options)

    // Return results and remove `objectID` field
    return res.json(hits.map(data => omit(data, ['objectID'])))
  } catch (err) {
    const index404 = isSearchIndex404Error(err)
    let error = err

    if (!err.className) error = createError(err, { options, query }, err.status)

    debug('api/menus')(error)
    return index404 ? res.json([]) : res.status(error.code).json(error)
  }
}
