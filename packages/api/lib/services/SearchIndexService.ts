import type { AnyObject } from '@flex-development/json'
import type {
  FindSearchIndexResourceQuery,
  NumberString,
  OrNever
} from '@flex-development/kustomzcore'
import { EMPTY_SPACE } from '@flex-development/kustomzcore/config/constants'
import createError from '@flex-development/kustomzcore/utils/createError'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import ALGOLIA from '../config/algolia-search'
import {
  DEFAULT_SEARCH_OPTIONS as DSO,
  PAGINATION_PARAMS,
  SEARCH_INDEX_SETTINGS
} from '../config/constants'
import type {
  Hit,
  SearchIndex,
  SearchIndexName,
  SearchIndexObjectsFN as ObjectsFN,
  SearchIndexSettings,
  SearchOptions
} from '../types'
import ErrorHandling from './ErrorService'

/**
 * @file Implementation - SearchIndexService
 * @module services/SearchIndexService
 */

/**
 * Generic service for interacting with Algolia search indices.
 *
 * @see https://www.algolia.com/doc/api-reference/api-parameters/
 *
 * @template TObject - Search index object
 *
 * @class
 */
class SearchIndexService<TObject extends AnyObject = AnyObject> {
  /**
   * @protected
   * @property {ObjectsFN<TObject>} objects - Function to populate
   * search index. Can be asynchronous
   */
  protected getObjects: ObjectsFN<TObject>

  /**
   * @protected
   * @property {SearchIndex} index - Algolia search index object
   */
  protected index: SearchIndex

  /**
   * @protected
   * @property {SearchIndexName} index_name - Name of the search index
   */
  protected index_name: SearchIndexName

  /**
   * @protected
   * @property {SearchIndexSettings} settings - Search index settings
   */
  protected settings: SearchIndexSettings = {}

  /**
   * @property {string} oid_key - Name of field to set `objectID` value
   */
  oid_key: keyof TObject

  /**
   * Initializes an Algolia search index service.
   *
   * @param {string} name - Name of search index to initialize controller for
   * @param {string} oid_key - Name of key to use when setting objectID
   * @param {ObjectsFN} getObjects - Function that returns objects to
   * populate search index. Can be asynchronous
   * @param {boolean} [clear] - Clear index objects after updating index
   * settings. Defaults to `false`
   */
  constructor(
    name: SearchIndexName,
    oid_key: keyof TObject,
    getObjects?: SearchIndexService<TObject>['getObjects'],
    clear: boolean = false
  ) {
    this.index = ALGOLIA.initIndex(name)
    this.index_name = name
    this.oid_key = oid_key
    this.settings = omit(SEARCH_INDEX_SETTINGS[name] || {}, ['name'])

    // Update object populate fn
    this.getObjects = getObjects || (() => [])

    // Update settings and clear search index
    this.index.setSettings(this.settings).wait()
    if (clear) this.index.clearObjects().wait()
  }

  /**
   * Retrieve a single search index resource.
   *
   * @async
   * @param {NumberString} objectID - Search index object ID
   * @param {string} [fields] - Specify fields to include for each object
   * @return {Promise<TObject>} Promise containing search index resource
   * @throws {FeathersErrorJSON}
   */
  async get(
    objectID: Hit<TObject>['objectID'],
    fields?: FindSearchIndexResourceQuery['fields']
  ): OrNever<Promise<TObject>> {
    // Get search index options
    const options = this.searchOptions({ fields, objectID })

    // Execute search
    const results = await this.search('', options)

    // Throw error if resource isn't found
    if (!results.length) {
      const data = { errors: { objectID }, fields }
      const message = `Object with objectID "${objectID}" not found`

      throw createError(message, data, 404)
    }

    return results[0]
  }

  /**
   * Returns an array of objects populate the search index.
   *
   * @async
   * @return {Promise<TObject[]>} Promise containing initial index objects
   * @throws {FeathersErrorJSON}
   */
  async objects(): OrNever<Promise<(TObject & { objectID: string })[]>> {
    try {
      const objects = await this.getObjects()
      return objects.map(obj => ({ ...obj, objectID: obj[this.oid_key] }))
    } catch (err) {
      const data = { index_name: this.index_name, oid_key: this.oid_key }
      throw createError(err, data, err.code || err.status)
    }
  }

  /**
   * Executes a search against the index.
   *
   * @async
   * @param {string} [query] - Text to search in the current index
   * @param {SearchOptions} [options] - Search index options
   * @return {Promise<TObject[]>} Array of search results
   * @throws {FeathersErrorJSON}
   */
  async search(
    query?: string,
    options?: SearchOptions
  ): OrNever<Promise<TObject[]>> {
    try {
      // Save search index objects
      this.index.saveObjects(await this.objects()).wait()

      // Perform search and return results
      return (await this.index.search<TObject>(query || '', options)).hits
    } catch (err) {
      const data = { index_name: this.index_name, options, query }
      const error = ErrorHandling.format(err, data)

      const { search_index_404 } = error.data

      if (search_index_404) return []
      throw error
    }
  }

  /**
   * Converts an API query object into an Algolia search options object.
   *
   * @see https://www.algolia.com/doc/api-reference/api-parameters/filters/
   *
   * @param {FindSearchIndexResourceQuery} [query] - Query parameters object
   * @param {string} [query.fields] - Comma-separated list of fields to include
   * @param {number} [query.hitsPerPage] - Number of results per page
   * @param {number} [query.length] - Result limit (used only with offset)
   * @param {string} [query.objectID] - Find resource by search index object ID
   * @param {number} [query.offset] - Offset of the first result to return
   * @param {number} [query.page] - Specify the page to retrieve
   * @param {string} [query.text] - Text to search in index
   * @return {SearchOptions} Algolia search options object
   */
  searchOptions(query: FindSearchIndexResourceQuery = {}): SearchOptions {
    const { fields, objectID, ...rest } = query

    // Initialize search filters array
    const filters: string[] = []

    // Update default attributes to retrieve
    let attributesToRetrieve = DSO.attributesToRetrieve

    // Handle `fields` query param
    if (fields?.trim().length) {
      attributesToRetrieve = fields.trim().split(',').flat()
    }

    // Add objectID filter
    if (!isEmpty(objectID)) filters.push(`objectID:${objectID}`)

    return {
      ...DSO,
      ...pick(rest, PAGINATION_PARAMS),
      attributesToRetrieve,
      filters: join(filters, EMPTY_SPACE)
    }
  }
}

export default SearchIndexService
