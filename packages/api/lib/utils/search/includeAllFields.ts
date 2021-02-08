import type { SearchOptions } from '../../types'

/**
 * @file Implementation - includeAllFields
 * @module lib/utils/search/includeAllFields
 */

/**
 * Returns true if all fields should be included when searching for API
 * resources.
 *
 * @param options - Search index options
 * @param options.attributesToRetrieve - Gives control over which attributes to
 * retrieve and which not to retrieve
 */
const includeAllFields = (options: SearchOptions): boolean => {
  return options.attributesToRetrieve?.includes('*') ?? false
}

export default includeAllFields
