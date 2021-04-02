import type { AnyObject } from '@flex-development/json'
import type {
  APIQuery,
  NumberString,
  OrNever
} from '@flex-development/kustomzcore'
import { EMPTY_SPACE } from '@flex-development/kustomzcore/config/constants'
import createError from '@flex-development/kustomzcore/utils/createError'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import ALGOLIA from '../../config/algolia'
import {
  PAGINATION_PARAMS,
  SEARCH_INDEX_SETTINGS
} from '../../config/constants'
import ErrorHandling from '../../mixins/ErrorHandling'
import type {
  Hit,
  SearchIndex,
  SearchIndexName,
  SearchIndexObjectsFN as ObjectsFN,
  SearchIndexSettings,
  SearchOptions
} from '../../types'

/**
 * @file Implementation - SearchIndexService
 * @module lib/services/SearchIndexService
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
   * @property {SearchOptions} DSO - Default search options
   */
  static DSO: SearchOptions = {
    attributesToHighlight: [],
    attributesToRetrieve: ['objectID'],
    attributesToSnippet: []
  }

  /**
   * @property {string} ENV - Node environment
   */
  static ENV: string = (process.env.NODE_ENV || 'development').toLowerCase()

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
   * @property {SearchIndexName | string} index_name - Name of the search index
   */
  protected index_name: SearchIndexName | string

  /**
   * @protected
   * @property {SearchIndexSettings} settings - Search index settings
   */
  protected settings: SearchIndexSettings = {}

  /**
   * @property {string} oidk - Name of field to set `objectID` value
   */
  oidk: keyof TObject

  /**
   * Initializes an Algolia search index service.
   *
   * The search index name, {@param name}, will be prefixed with the current
   * Node environment followed by an underscore (_).
   *
   * @param {SearchIndexName | string} name - Name of search index to initialize
   * @param {string} oidk - Name of key to use when setting objectID
   * @param {ObjectsFN} getObjects - Function that returns objects to
   * populate search index. Can be asynchronous
   * @param {boolean} [clear] - Clear index objects after updating index
   * settings. Defaults to `false`
   */
  constructor(
    name: SearchIndexName | string,
    oidk: keyof TObject,
    getObjects?: SearchIndexService<TObject>['getObjects'],
    clear: boolean = false
  ) {
    this.index_name = `${SearchIndexService.ENV}_${name}`
    this.index = ALGOLIA.initIndex(this.index_name)
    this.oidk = oidk
    this.settings = omit(SEARCH_INDEX_SETTINGS[name] || {}, ['name'])

    // Update object populate fn
    this.getObjects = getObjects || (() => [])

    // Update settings and clear search index
    this.index.setSettings(this.settings).wait()
    if (clear) this.index.clearObjects().wait()
  }

  /**
   * Performs a search.
   *
   * @async
   * @param {APIQuery.SearchIndex} [query] - Query parameters
   * @param {string} [query.fields] - Comma-separated list of fields to include
   * @param {number} [query.hitsPerPage] - Number of results per page
   * @param {number} [query.length] - Result limit (used only with offset)
   * @param {number} [query.limit] - Number of hits to retrieve
   * @param {string} [query.objectID] - Find resource by search index objectID
   * @param {number} [query.offset] - Offset of the first result to return
   * @param {number} [query.page] - Specify the page to retrieve
   * @param {string} [query.text] - Text to search in index
   * @return {Promise<TObject[]>} Promise containing search results
   */
  async find(query: APIQuery.SearchIndex = {}): OrNever<Promise<TObject[]>> {
    // Convert query into search options object
    const options = this.searchOptions(query)

    // Execute search
    return await this.search(query.text, options)
  }

  /**
   * Performs a search for a single search index resource.
   *
   * @async
   * @param {APIQuery.SearchIndexObject} query - Query parameters
   * @param {string} [query.fields] - Comma-separated list of fields to include
   * @param {string} query.objectID - ID of resource to retrieve
   * @return {Promise<TObject>} Promise containing search index resource
   */
  async findOne(query: APIQuery.SearchIndexObject): OrNever<Promise<TObject>> {
    return this.get(query.objectID as Hit<TObject>['objectID'], query.fields)
  }

  /**
   * Retrieve a single search index resource.
   *
   * @async
   * @param {NumberString} objectID - Search index object ID
   * @param {string} [fields] - Specify fields to include for each object
   * @return {Promise<TObject>} Promise containing search index resource
   * @throws {ErrorJSON}
   */
  async get(
    objectID: Hit<TObject>['objectID'],
    fields?: APIQuery.SearchIndexObject['fields']
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
   * Returns an array of objects populate the search index. Each object will
   * have an `objectID` field attached.
   *
   * @async
   * @return {Promise<Array<TObject & { objectID: string }>>} Promise containing
   * initial index objects with additional objectID property
   * @throws {ErrorJSON}
   */
  async objects(): OrNever<Promise<(TObject & { objectID: string })[]>> {
    try {
      const objects = await this.getObjects()
      return objects.map(obj => ({ ...obj, objectID: obj[this.oidk] }))
    } catch (err) {
      const data = { index_name: this.index_name, oidk: this.oidk }
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
   * @throws {ErrorJSON}
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
      const error = ErrorHandling.formatError(err, data)

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
   * @param {APIQuery.SearchIndex} [query] - Query parameters
   * @param {string} [query.fields] - Comma-separated list of fields to include
   * @param {number} [query.hitsPerPage] - Number of results per page
   * @param {number} [query.length] - Result limit (used only with offset)
   * @param {number} [query.limit] - Number of hits to retrieve
   * @param {string} [query.objectID] - Find resource by search index objectID
   * @param {number} [query.offset] - Offset of the first result to return
   * @param {number} [query.page] - Specify the page to retrieve
   * @param {string} [query.text] - Text to search in index
   * @return {SearchOptions} Algolia search options object
   */
  searchOptions(query: APIQuery.SearchIndex = {}): SearchOptions {
    const { fields, limit, objectID, ...rest } = query

    // Initialize search filters array
    const filters: string[] = []

    // Update default attributes to retrieve
    let attributesToRetrieve = SearchIndexService.DSO.attributesToRetrieve || []

    // Handle `fields` query param
    if (fields?.trim().length) {
      attributesToRetrieve = fields.trim().split(',').flat()
    }

    // Add objectID filter
    if (!isEmpty(objectID)) filters.push(`objectID:${objectID}`)

    return {
      ...SearchIndexService.DSO,
      ...pick(rest, PAGINATION_PARAMS),
      attributesToRetrieve,
      filters: join(filters, EMPTY_SPACE),
      length: rest.length || limit,
      offset: rest.offset || limit ? 0 : undefined
    }
  }
}

export default SearchIndexService
