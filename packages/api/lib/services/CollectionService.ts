import type { AnyObject, PartialOr } from '@flex-development/json'
import type {
  ICollectionListing,
  IMetafield,
  IProductListing,
  ShopifyAPIResponses as SAR
} from '@flex-development/kustomzcore'
import { createError, EMPTY_SPACE } from '@flex-development/kustomzcore'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import merge from 'lodash/merge'
import uniq from 'lodash/uniq'
import stripHtml from 'string-strip-html'
import { axiosShopify, INDEX_SETTINGS, ShopifyAPI } from '../config'
import type {
  FindCollectionsQuery as Query,
  FindMetafieldParams,
  GetCollectionResJSON as TObject,
  SearchIndexName,
  SearchOptions,
  SEOData
} from '../types'
import { globalSEO, search, shopifySearchOptions } from '../utils'

/**
 * @file Implementation - Collection Service
 * @module lib/services/CollectionService
 */

export default class CollectionService {
  static api = ShopifyAPI.collectionListing
  static index_name: SearchIndexName = INDEX_SETTINGS.collection_listings.name

  /**
   * Executes a collection listing resource search.
   *
   * @async
   * @param query - Search index query text
   * @param options - Search index options
   */
  static async find(
    query = '',
    options: SearchOptions = {}
  ): Promise<TObject[]> {
    const objects = await CollectionService.indexObjects()
    return search(CollectionService.index_name, objects, query, options)
  }

  /**
   * Retrieve a collection listing by handle.
   *
   * @async
   * @param handle - Handle of collection to retrieve
   * @param fields - Specify fields to include for each object
   * @throws {FeathersErrorJSON}
   */
  static async get(
    handle: NonNullable<Query['handle']>,
    fields?: Query['fields']
  ): Promise<TObject> {
    // Get search index options
    const options = CollectionService.searchOptions({ fields, handle })

    // Execute search
    const results = await CollectionService.find('', options)

    // Throw error if resource isn't found
    if (!results.length) {
      const data = { errors: { handle }, fields }
      const message = `Collection with handle "${handle}" not found`

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
    // Fetch collection listings data from Shopify
    let data = await CollectionService.api.list()

    // Remove unpublished collections
    data = data.filter(data => data.published_at !== null)

    // Get objects to populate search index
    const objects: TObject[] | Promise<TObject>[] = data.map(async obj => {
      // Keep objectID consistent with collection listing ID
      const $obj: AnyObject = { ...obj, objectID: obj.collection_id }

      // Get metafields for each collection
      $obj.metafield = await CollectionService.metafields($obj.collection_id)

      // Get products for each collection
      $obj.products = await CollectionService.products($obj.collection_id)

      // Get SEO data for each collection
      const collection = $obj as ICollectionListing
      $obj.seo = await CollectionService.seo(collection, $obj.products)

      return $obj as TObject
    })

    return await Promise.all(objects)
  }

  /**
   * Returns an array of metafields for a collection resource.
   *
   * @async
   * @param id - ID of collection to get metafields for
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
    id: ICollectionListing['collection_id'],
    params: FindMetafieldParams = {}
  ): Promise<PartialOr<IMetafield>[]> {
    const config: Parameters<typeof axiosShopify>[0] = {
      method: 'get',
      params,
      url: `collections/${id}/metafields`
    }

    return (await axiosShopify<SAR.Metafields>(config)).metafields
  }

  /**
   * Returns an array of product listings for a collection resource.
   *
   * @async
   * @param id - ID of collection to get product listings for
   * @param limit - Maximum number of results to show. Defaults to `250`
   */
  static async products(
    id: ICollectionListing['collection_id'],
    limit?: number
  ): Promise<IProductListing[]> {
    const { product_listings } = await axiosShopify<SAR.ProductListing>({
      method: 'get',
      params: { collection_id: id, limit: limit || 250 },
      url: 'product_listings'
    })

    return product_listings
  }

  /**
   * Converts a collection query object into an Algolia search options object.
   *
   * @see https://www.algolia.com/doc/api-reference/api-parameters/filters/
   *
   * @param query - Collection query from API request
   * @param query.collection_id - Find collection listing by collection ID
   * @param query.fields - Comma-separated list of collection fields to include
   * @param query.handle - Find collection listing by collection handle
   */
  static searchOptions(query: Query = {}): SearchOptions {
    const { collection_id: id, ...rest } = query

    // Get default search options
    const options = shopifySearchOptions(rest)

    // Initialize search filters array
    const filters: string[] = options.filters?.length ? [options.filters] : []

    // Add collection_id filter
    if (!isEmpty(id)) filters.push(`collection_id = ${id}`)

    // Add collection_id to attributes
    const attributes = options.attributesToRetrieve?.concat(['collection_id'])

    return {
      ...options,
      attributesToRetrieve: uniq(attributes),
      filters: join(filters, EMPTY_SPACE)
    }
  }

  /**
   * Returns an object with SEO data for a collection listing resource.
   *
   * @async
   * @param listing - Collecting listing data
   * @param products - Products in collection
   */
  static async seo(
    listing: ICollectionListing | Promise<ICollectionListing>,
    products: IProductListing[] = []
  ): Promise<SEOData> {
    listing = await listing

    // Get global SEO data
    const global = await globalSEO()

    // Get collection image
    const image = listing.image || listing.default_product_image || {}

    // Build keywords from product tags
    let keywords: string[] = []

    products.forEach(product => {
      keywords = keywords.concat(product.tags.trim().split(','))
    })

    keywords = uniq(keywords.concat(global.keywords?.split(',') ?? []))

    return merge(global, {
      description: stripHtml(listing.body_html).result.trim(),
      keywords: join(keywords, ','),
      og: {
        image: image.src,
        'image:alt': isEmpty(image) ? image.alt : image.alt || '',
        'image:height': isEmpty(image) ? image.height : image.height || null,
        'image:secure_url': image.src,
        'image:width': isEmpty(image) ? image.width : image.width || null
      },
      title: `Collections - ${listing.title}`,
      twitter: { image: image.src }
    })
  }
}
