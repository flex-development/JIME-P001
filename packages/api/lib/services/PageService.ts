import type { AnyObject, PartialOr } from '@flex-development/json'
import type {
  FindMetafieldParams,
  FindPagesQuery as Query,
  GetPageResJSON as TObject,
  IMetafield,
  IPage,
  SEOData,
  ShopifyAPIResponses as SAR
} from '@flex-development/kustomzcore'
import {
  createError,
  EMPTY_SPACE,
  objectFromArray
} from '@flex-development/kustomzcore'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import merge from 'lodash/merge'
import uniq from 'lodash/uniq'
import axiosShopify from '../config/axios-shopify'
import { INDEX_SETTINGS } from '../config/constants'
import ShopifyAPI from '../config/shopify-api'
import type { SearchIndexName, SearchOptions } from '../types'
import globalSEO from '../utils/globalSEO'
import search from '../utils/search'
import shopifySearchOptions from '../utils/shopifySearchOptions'
import toJSX from '../utils/toJSX'

/**
 * @file Implementation - Page Service
 * @module lib/services/PageService
 */

export default class PageService {
  static api = ShopifyAPI.page
  static index_name: SearchIndexName = INDEX_SETTINGS.pages.name

  /**
   * Executes a page resource search.
   *
   * @async
   * @param query - Search index query text
   * @param options - Search index options
   */
  static async find(
    query = '',
    options: SearchOptions = {}
  ): Promise<TObject[]> {
    const objects = await PageService.indexObjects()
    return search(PageService.index_name, objects, query, options)
  }

  /**
   * Retrieve a page by handle.
   *
   * @async
   * @param handle - Handle of page to retrieve
   * @param fields - Specify fields to include for each object
   * @throws {FeathersErrorJSON}
   */
  static async get(
    handle: NonNullable<Query['handle']>,
    fields?: Query['fields']
  ): Promise<TObject> {
    // Get search index options
    const options = PageService.searchOptions({ fields, handle })

    // Execute search
    const results = await PageService.find('', options)

    // Throw error if resource isn't found
    if (!results.length) {
      const data = { errors: { handle }, fields }
      const message = `Page with handle "${handle}" not found`

      throw createError(message, data, 404)
    }

    return results[0]
  }

  /**
   * Returns an array of objects to populate the search index.
   *
   * @async
   */
  static async indexObjects(): Promise<TObject[]> {
    // Fetch page data from Shopify
    let data = await PageService.api.list()

    // ! Remove API Menus page
    data = data.filter(data => data.handle !== 'api-menus')

    // Remove unpublished pages
    data = data.filter(data => data.published_at !== null)

    // Get objects to populate search index
    const objects: TObject[] | Promise<TObject>[] = data.map(async obj => {
      // Keep objectID consistent with page ID
      const $obj: AnyObject = { ...obj, objectID: obj.id }

      // Parse MDX body content
      $obj.body_html = await toJSX($obj.body_html)

      // Get metafields for each page
      $obj.metafield = await PageService.metafields($obj.id)

      // Get SEO data for each page
      $obj.seo = await PageService.seo($obj as IPage)

      return $obj as TObject
    })

    return await Promise.all(objects)
  }

  /**
   * Returns an array of metafields for a page resource.
   *
   * @async
   * @param id - ID of page to get metafields for
   * @param params - Query parameters
   * @param params.created_at_max - Show metafields created before date
   * @param params.created_at_min - Show metafields created after date
   * @param params.fields - Comma-separated list of fields to show
   * @param params.key - Show metafields with given key
   * @param params.limit - Maximum number of results to show. Defaults to `250`
   * @param params.namespace - Show metafields with given namespace
   * @param params.updated_at_max - Show metafields updated before date
   * @param params.updated_at_min - Show metafields updated after date
   * @param params.value_type - Show metafields with a value_type of 'integer'
   * or 'string'
   */
  static async metafields(
    id: IPage['id'],
    params: FindMetafieldParams = {}
  ): Promise<PartialOr<IMetafield>[]> {
    const config: Parameters<typeof axiosShopify>[0] = {
      method: 'get',
      params,
      url: `pages/${id}/metafields`
    }

    return (await axiosShopify<SAR.Metafields>(config)).metafields
  }

  /**
   * Converts a page query object into an Algolia search options object.
   *
   * @see https://www.algolia.com/doc/api-reference/api-parameters/filters/
   *
   * @param query - Page query from API request
   * @param query.author - Filter pages by author
   * @param query.fields - Comma-separated list of page fields to include
   * @param query.handle - Find page by handle
   * @param query.id - Find page by ID
   */
  static searchOptions(query: Query = {}): SearchOptions {
    const { author, ...rest } = query

    // Get default search options
    const options = shopifySearchOptions(rest)

    // Initialize search filters array
    const filters: string[] = options.filters?.length ? [options.filters] : []

    // Add author filter
    if (!isEmpty(author)) filters.push(`author = ${author}`)

    // Add id to attributes
    const attributes = options.attributesToRetrieve?.concat(['id'])

    return {
      ...options,
      attributesToRetrieve: uniq(attributes),
      filters: join(filters, EMPTY_SPACE)
    }
  }

  /**
   * Returns an object with SEO data for a page resource.
   *
   * @async
   * @param page - Page resource data
   */
  static async seo(page: IPage | Promise<IPage>): Promise<SEOData> {
    page = await page

    // Get global SEO data
    const global = await globalSEO()

    // Get SEO from metafields
    const {
      description_tag = { value: '' } as IMetafield,
      keywords: page_keywords = { value: '' } as IMetafield,
      title_tag = { value: '' } as IMetafield
    } = objectFromArray(page.metafield, 'key')

    // Get array of page keywords
    let keywords: string[] = (page_keywords?.value as string)?.split(',') ?? []
    keywords = uniq(keywords.concat(global.keywords?.split(',') ?? []))

    return merge(global, {
      description: description_tag.value as string,
      keywords: join(keywords, ','),
      title: title_tag.value
    })
  }
}
