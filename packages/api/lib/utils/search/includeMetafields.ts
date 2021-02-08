import type { SearchOptions } from '../../types'
import allFields from './includeAllFields'

/**
 * @file Implementation - includeMetafields
 * @module lib/utils/search/includeMetafields
 */

/**
 * Returns true if the `metafield` field should be populated while performing a
 * search for Shopify resources.
 *
 * @param options - Search index options
 * @param options.attributesToRetrieve - Gives control over which attributes to
 * retrieve and which not to retrieve
 */
const includeMetafields = (options: SearchOptions): boolean => {
  const { attributesToRetrieve: fields = [] } = options

  const exclude = fields.includes('-_metafields')
  const include = allFields(options) || fields.includes('metafields')

  return !exclude && include
}

export default includeMetafields
