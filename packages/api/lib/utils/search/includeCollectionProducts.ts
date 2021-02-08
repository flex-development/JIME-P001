import type { SearchOptions } from '../../types'
import allFields from './includeAllFields'
import includeSEO from './includeSEO'

/**
 * @file Implementation - includeCollectionProducts
 * @module lib/utils/search/includeCollectionProducts
 */

/**
 * Returns true if the `products` field should be included while searching for
 * Shopify `ICollectionListing` resources.
 *
 * @param options - Search index options
 * @param options.attributesToRetrieve - Gives control over which attributes to
 * retrieve and which not to retrieve
 */
const includeCollectionProducts = (options: SearchOptions): boolean => {
  const { attributesToRetrieve: fields = [] } = options

  const exclude = fields.includes('-products')
  const include = fields.includes('products')

  return !exclude && (allFields(options) || includeSEO(options) || include)
}

export default includeCollectionProducts
