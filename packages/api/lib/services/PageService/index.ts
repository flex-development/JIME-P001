import type { AnyObject } from '@flex-development/json'
import type {
  APIQuery,
  IPage,
  OrNever,
  TObject as ObjectType
} from '@flex-development/kustomzcore'
import { EMPTY_SPACE } from '@flex-development/kustomzcore/config/constants'
import { PagePublishedStatus } from '@flex-development/kustomzcore/types'
import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'
import join from 'lodash/join'
import uniq from 'lodash/uniq'
import { SEARCH_INDEX_SETTINGS } from '../../config/constants'
import SEO from '../../mixins/SEO'
import ShopifyAPI from '../../mixins/ShopifyAPI'
import type { SearchOptions, TObjectEnhanced } from '../../types'
import SearchIndexService from '../SearchIndexService'

/**
 * @file Implementation - Page Service
 * @module lib/services/PageService
 */

export type TObject = ObjectType.Page

/**
 * Handles interactions with page resources.
 *
 * @class
 * @extends SearchIndexService
 */
export default class PageService extends SearchIndexService<TObject> {
  /**
   * Initializes a new Page service instance.
   */
  constructor() {
    super(SEARCH_INDEX_SETTINGS.pages.name, 'handle', PageService.getObjects)
  }

  /**
   * Returns an array of augmented Shopify page objects to populate the search
   * index.
   *
   * @async
   * @return {Promise<TObject[]>} Promise containing index objects
   * @throws {ErrorJSON}
   */
  static async getObjects(): OrNever<Promise<TObject[]>> {
    // Fetch page data from Shopify
    let data = await ShopifyAPI.pages({
      published_status: PagePublishedStatus.PUBLISHED
    })

    // ! Remove API Menus page
    data = data.filter(data => data.handle !== 'api-menus')

    // Get objects to populate search index
    const objects: TObject[] | Promise<TObject>[] = data.map(async obj => {
      const $obj: AnyObject = { ...obj }

      // Get metafields for each page
      $obj.metafield = await ShopifyAPI.metafield('pages', $obj.id)

      return $obj as TObject
    })

    return await Promise.all(objects)
  }

  /**
   * Retrieve a page by handle.
   *
   * @async
   * @param {string} objectID - Handle of page to retrieve
   * @param {string} [fields] - Specify fields to include
   * @return {Promise<TObjectEnhanced<TObject>>} Promise containing page data
   */
  async get(
    objectID: IPage['handle'],
    fields?: APIQuery.Page.Get['fields']
  ): OrNever<Promise<TObjectEnhanced<TObject>>> {
    const data: TObjectEnhanced<TObject> = await super.get(objectID, fields)

    if (SEO.includeSEO(fields)) data.seo = await SEO.page(data.metafield)

    return data
  }

  /**
   * Converts a `Page` service query into an Algolia search options object.
   *
   * @see https://www.algolia.com/doc/api-reference/api-parameters/filters/
   *
   * @param {APIQuery.Page.Find} [query] - Query parameters
   * @param {string} [query.author] - Filter pages by author
   * @param {string} [query.fields] - Comma-separated list of fields to include
   * @param {number} [query.hitsPerPage] - Number of results per page
   * @param {number} [query.id] - Find page by ID
   * @param {number} [query.length] - Result limit (used only with offset)
   * @param {number} [query.limit] - Number of hits to retrieve
   * @param {string} [query.objectID] - Find resource by search index objectID
   * @param {number} [query.offset] - Offset of the first result to return
   * @param {number} [query.page] - Specify the page to retrieve
   * @param {string} [query.text] - Text to search in index
   * @param {string} [query.userToken] - User identifier
   * @return {SearchOptions} Algolia search options object
   */
  searchOptions(query: APIQuery.Page.Find = {}): SearchOptions {
    const { author, id = null, ...rest } = query

    // Get default search options
    const { attributesToRetrieve = [], ...options } = super.searchOptions(rest)

    // Initialize search filters array
    const filters: string[] = options.filters?.length ? [options.filters] : []

    // Add author filter
    if (isString(author) && author.length) filters.push(`author:"${author}"`)

    // Add id filter
    if (isNumber(JSON.parse(`${id}`))) filters.push(`id = ${id}`)

    // Add id to attributes
    const attributes = attributesToRetrieve.concat(['id'])

    return {
      ...options,
      attributesToRetrieve: uniq(attributes),
      filters: join(filters, EMPTY_SPACE)
    }
  }
}
