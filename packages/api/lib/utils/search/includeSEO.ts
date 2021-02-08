import type { SearchOptions } from '../../types'
import allFields from './includeAllFields'

/**
 * @file Implementation - includeSEO
 * @module lib/utils/search/includeSEO
 */

/**
 * Returns true if the `seo` field should be included while searching for
 * Shopify resources.
 *
 * @param options - Search index options
 * @param options.attributesToRetrieve - Gives control over which attributes to
 * retrieve and which not to retrieve
 */
const includeSEO = (options: SearchOptions): boolean => {
  const { attributesToRetrieve: fields = [] } = options

  const exclude = fields.includes('-seo')
  const include = fields.includes('seo')

  return !exclude && (allFields(options) || include)
}

export default includeSEO
