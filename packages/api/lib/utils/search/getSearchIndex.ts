import omit from 'lodash/omit'
import { ALGOLIA, INDEX_SETTINGS } from '../../config'
import type { SearchIndex, SearchIndexName } from '../../types'
import formatError from '../errors/formatError'

/**
 * @file Implementation - getSearchIndex
 * @module lib/utils/search/getSearchIndex
 */

/**
 * Returns an empty Algolia search index object.
 *
 * @param name - Name of search index
 * @throws {FeathersErrorJSON}
 */
const getSearchIndex = async (name: SearchIndexName): Promise<SearchIndex> => {
  try {
    // Get index settings
    const settings = INDEX_SETTINGS[name] || {}

    // Initialize search index
    const index = ALGOLIA.initIndex(settings.name)

    // Set index settings
    index.setSettings(omit(settings, ['name']))

    // Clear index
    await index.clearObjects()

    return index
  } catch (error) {
    throw formatError(error)
  }
}

export default getSearchIndex
