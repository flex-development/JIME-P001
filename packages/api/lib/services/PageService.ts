import type { AnyObject } from '@flex-development/json'
import type {
  FindPagesQuery,
  FindSearchIndexResourceQuery,
  GetPageResJSON as TObject,
  IPage,
  OrNever
} from '@flex-development/kustomzcore'
import { EMPTY_SPACE } from '@flex-development/kustomzcore/config/constants'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import uniq from 'lodash/uniq'
import { SEARCH_INDEX_SETTINGS } from '../config/constants'
import ShopifyAPI from '../config/shopify-api'
import type { SearchOptions } from '../types'
import Metafields from './MetafieldService'
import SearchIndexService from './SearchIndexService'
import SEO from './SEOService'

/**
 * @file Implementation - Page Service
 * @module services/PageService
 */

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
   * @return {Promise<TObject[]>} Promise containing initial index objects
   * @throws {FeathersErrorJSON}
   */
  static async getObjects(): OrNever<Promise<TObject[]>> {
    // Fetch page data from Shopify
    let data = await ShopifyAPI.page.list()

    // ! Remove API Menus page
    data = data.filter(data => data.handle !== 'api-menus')

    // Remove unpublished pages
    data = data.filter(data => data.published_at !== null)

    // Get objects to populate search index
    const objects: TObject[] | Promise<TObject>[] = data.map(async obj => {
      const $obj: AnyObject = { ...obj }

      // Get metafields for each page
      $obj.metafield = await Metafields.fetch('pages', $obj.id)

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
   * @return {Promise<TObject>} Promise containing page data
   * @throws {FeathersErrorJSON}
   */
  async get(
    objectID: IPage['handle'],
    fields?: FindSearchIndexResourceQuery['fields']
  ): OrNever<Promise<TObject>> {
    const data = await super.get(objectID, fields)

    if (SEO.includeSEO(fields)) data.seo = await SEO.page(data as IPage)

    return data
  }

  /**
   * Converts a `FindPagesQuery` type object into an Algolia search options
   * object.
   *
   * @see https://www.algolia.com/doc/api-reference/api-parameters/filters/
   *
   * @param {FindPagesQuery} [query] - Query parameters object
   * @param {string} [query.author] - Filter pages by author
   * @param {string} [query.fields] - Comma-separated list of fields to include
   * @param {number} [query.hitsPerPage] - Number of results per page
   * @param {number} [query.id] - Find page by ID
   * @param {number} [query.length] - Result limit (used only with offset)
   * @param {string} [query.objectID] - Find resource by search index object ID
   * @param {number} [query.offset] - Offset of the first result to return
   * @param {number} [query.page] - Specify the page to retrieve
   * @param {string} [query.text] - Text to search in index
   * @return {SearchOptions} Algolia search options object
   */
  searchOptions(query: FindPagesQuery = {}): SearchOptions {
    const { author, id, ...rest } = query

    // Get default search options
    const options = super.searchOptions(rest)

    // Initialize search filters array
    const filters: string[] = options.filters?.length ? [options.filters] : []

    // Add author filter
    if (!isEmpty(author)) filters.push(`author:${author}`)

    // Add id filter
    if (!isEmpty(id)) filters.push(`id:${id}`)

    // Add id to attributes
    const attributes = options.attributesToRetrieve?.concat(['id'])

    return {
      ...options,
      attributesToRetrieve: uniq(attributes),
      filters: join(filters, EMPTY_SPACE)
    }
  }
}
