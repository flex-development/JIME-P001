import type { AnyObject } from '@flex-development/json'
import omit from 'lodash/omit'
import type { SearchIndexName, SearchOptions } from '../types'
import formatError from './formatError'
import getSearchIndex from './getSearchIndex'

/**
 * @file Implementation - search
 * @module lib/utils/search
 */

/**
 * Executes a search.
 *
 * @async
 * @param index - Search index object
 * @param objects - Index data
 * @param text - Search text
 * @param options - Search index options
 */
async function search<TObject = AnyObject>(
  name: SearchIndexName,
  objects: TObject[] = [],
  text = '',
  options: SearchOptions = {}
): Promise<TObject[]> {
  try {
    // Get empty search index
    const index = await getSearchIndex(name)

    // Update index data
    await index.saveObjects(objects)

    // Perform search
    const { hits } = await index.search<TObject>(text, options)

    // Return results and remove `objectID` field
    return hits.map(data => omit(data, ['objectID']) as TObject)
  } catch (err) {
    const error = formatError(err, { index_name: name, options, text })
    const { search_index_404 } = error.data

    if (search_index_404) return []
    throw error
  }
}

export default search
