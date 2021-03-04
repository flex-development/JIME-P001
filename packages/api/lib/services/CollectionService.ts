import type { AnyObject, PartialOr } from '@flex-development/json'
import type {
  FindCollectionsQuery,
  FindMetafieldParams,
  GetCollectionResJSON as TObject,
  ICollectionListing,
  IMetafield,
  IProductListing,
  OrNever,
  SEOData,
  ShopifyAPIResponses as SAR
} from '@flex-development/kustomzcore'
import { EMPTY_SPACE } from '@flex-development/kustomzcore'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import merge from 'lodash/merge'
import uniq from 'lodash/uniq'
import { stripHtml } from 'string-strip-html'
import axiosShopify from '../config/axios-shopify'
import { INDEX_SETTINGS } from '../config/constants'
import ShopifyAPI from '../config/shopify-api'
import SearchIndexController from '../controllers/SearchIndexController'
import type { SearchOptions } from '../types'
import globalSEO from '../utils/globalSEO'

/**
 * @file Implementation - Collection Service
 * @module lib/services/CollectionService
 */

export default class CollectionService extends SearchIndexController<TObject> {
  /**
   * Initializes a new Collection Listing service instance.
   */
  constructor() {
    const { collection_listings } = INDEX_SETTINGS
    super(collection_listings.name, 'handle', CollectionService.getObjects)
  }

  /**
   * Returns an array of metafields for a collection resource.
   *
   * @async
   * @param {number} id - ID of collection to get metafields for
   * @param {FindMetafieldParams} [params] - Query parameters
   * @param {string} [params.created_at_max] - Metafields created before date
   * @param {string} [params.created_at_min] - Metafields created after date
   * @param {string} [params.fields] - Comma-separated list of fields to show
   * @param {string} [params.key] - Show metafields with given key
   * @param {number} [params.limit] - Max number of results. Defaults to `250`
   * @param {string} [params.namespace] - Show metafields with given namespace
   * @param {string} [params.updated_at_max] - Metafields updated before date
   * @param {string} [params.updated_at_min] - Metafields updated after date
   * @param {string} [params.value_type] - Show metafields with a value_type of
   * 'integer' or 'string'
   * @throws {FeathersErrorJSON}
   */
  static async metafields(
    id: ICollectionListing['collection_id'],
    params: FindMetafieldParams = {}
  ): OrNever<Promise<PartialOr<IMetafield>[]>> {
    const config: Parameters<typeof axiosShopify>[0] = {
      method: 'get',
      params,
      url: `collections/${id}/metafields`
    }

    return (await axiosShopify<SAR.Metafields>(config)).metafields
  }

  /**
   * Returns an array of augmented Shopify collection listing objects to
   * populate the search index.
   *
   * @async
   * @return {Promise<TObject[]>} Promise containing initial index objects
   * @throws {FeathersErrorJSON}
   */
  static async getObjects(): OrNever<Promise<TObject[]>> {
    // Fetch collection listings data from Shopify
    let data = await ShopifyAPI.collectionListing.list()

    // Remove unpublished collections
    data = data.filter(data => data.published_at !== null)

    // Get objects to populate search index
    const objects: TObject[] | Promise<TObject>[] = data.map(async obj => {
      const $obj: AnyObject = { ...obj }

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
   * Returns an array of product listings for a collection resource.
   *
   * @async
   * @param {number} id - ID of collection to get product listings for
   * @param {number} [limit] - Max number of results. Defaults to `250`
   * @return {Promise<IProductListing[]>} Promise containing collection products
   * @throws {FeathersErrorJSON}
   */
  static async products(
    id: ICollectionListing['collection_id'],
    limit?: number
  ): OrNever<Promise<IProductListing[]>> {
    const { product_listings } = await axiosShopify<SAR.ProductListing>({
      method: 'get',
      params: { collection_id: id, limit: limit || 250 },
      url: 'product_listings'
    })

    return product_listings
  }

  /**
   * Returns an object with SEO data for a collection listing resource.
   *
   * @async
   * @param {ICollectionListing | Promise<ICollectionListing>} listing -
   * Collecting listing data
   * @param {IProductListing[]} [products] - Products in collection
   * @return {Promise<SEOData>} Promise containing SEO data for listing
   * @throws {FeathersErrorJSON}
   */
  static async seo(
    listing: ICollectionListing | Promise<ICollectionListing>,
    products: IProductListing[] = []
  ): OrNever<Promise<SEOData>> {
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

  /**
   * Converts a `FindCollectionsQuery` type object into an Algolia search
   * options object.
   *
   * @see https://www.algolia.com/doc/api-reference/api-parameters/filters/
   *
   * @param {FindCollectionsQuery} [query] - Query parameters object
   * @param {string} [query.collection_id] - Find collection listing by ID
   * @param {string} [query.fields] - Comma-separated list of fields to include
   * @param {string} [query.handle] - Find resource by Shopify resource handle
   * @param {number} [query.hitsPerPage] - Number of results per page
   * @param {number} [query.length] - Result limit (used only with offset)
   * @param {string} [query.objectID] - Find resource by search index object ID
   * @param {number} [query.offset] - Offset of the first result to return
   * @param {number} [query.page] - Specify the page to retrieve
   * @param {string} [query.text] - Text to search in index
   * @return {SearchOptions} Algolia search options object
   */
  searchOptions(query: FindCollectionsQuery = {}): SearchOptions {
    const { collection_id, ...rest } = query

    // Get default search options
    const options = super.searchOptions(rest)

    // Initialize search filters array
    const filters: string[] = options.filters?.length ? [options.filters] : []

    // Add collection_id filter
    if (!isEmpty(collection_id)) filters.push(`collection_id:${collection_id}`)

    // Add collection_id to attributes
    const attributes = options.attributesToRetrieve?.concat(['collection_id'])

    return {
      ...options,
      attributesToRetrieve: uniq(attributes),
      filters: join(filters, EMPTY_SPACE)
    }
  }
}
