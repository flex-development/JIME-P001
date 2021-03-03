import type { AnyObject, PartialOr } from '@flex-development/json'
import type {
  FindMetafieldParams,
  FindProductsQuery as Query,
  GetProductResJSON as TObject,
  IMetafield,
  IProductImage,
  IProductListing,
  IProductListingVariant,
  SEOData,
  ShopifyAPIResponses as SAR
} from '@flex-development/kustomzcore'
import { createError, EMPTY_SPACE } from '@flex-development/kustomzcore'
import findIndex from 'lodash/findIndex'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import merge from 'lodash/merge'
import uniq from 'lodash/uniq'
import { stripHtml } from 'string-strip-html'
import axiosShopify from '../config/axios-shopify'
import { DEFAULT_SEO_IMAGE_DATA, INDEX_SETTINGS } from '../config/constants'
import ShopifyAPI from '../config/shopify-api'
import type { SearchIndexName, SearchOptions } from '../types'
import search from '../utils/search'
import shopifySearchOptions from '../utils/shopifySearchOptions'

/**
 * @file Implementation - Product Service
 * @module lib/services/ProductService
 */

export default class ProductService {
  static api = ShopifyAPI.productListing
  static index_name: SearchIndexName = INDEX_SETTINGS.product_listings.name

  /**
   * Executes a product listing resource search.
   *
   * @async
   * @param query - Search index query text
   * @param options - Search index options
   */
  static async find(
    query = '',
    options: SearchOptions = {}
  ): Promise<TObject[]> {
    const objects = await ProductService.indexObjects()
    return search(ProductService.index_name, objects, query, options)
  }

  /**
   * Retrieve a product listing by handle.
   *
   * @async
   * @param handle - Handle of product to retrieve
   * @param fields - Specify fields to include for each object
   * @param sku - sku - SKU of product variant to generate SEO for
   * @throws {FeathersErrorJSON}
   */
  static async get(
    handle: NonNullable<Query['handle']>,
    fields?: Query['fields'],
    sku?: IProductListingVariant['sku']
  ): Promise<TObject> {
    // Get search index options
    const options = ProductService.searchOptions({ fields, handle })

    // Execute search
    const results = await ProductService.find('', options)

    // Throw error if resource isn't found
    if (!results.length) {
      const data = { errors: { handle }, fields }
      const message = `Product with handle "${handle}" not found`

      throw createError(message, data, 404)
    }

    const listing = results[0]

    if (fields?.includes('seo')) {
      listing.seo = await ProductService.seo(listing as IProductListing, sku)
    }

    return listing
  }

  /**
   * Returns an array of objects to populate the search index.
   *
   * @async
   */
  static async indexObjects(): Promise<TObject[]> {
    // Fetch product listings data from Shopify
    let data = await ProductService.api.list()

    // Remove unpublished products
    data = data.filter(data => data.published_at !== null)

    // Get objects to populate search index
    const objects: TObject[] | Promise<TObject>[] = data.map(async obj => {
      // Keep objectID consistent with product listing ID
      const $obj: AnyObject = { ...obj, objectID: obj.product_id }

      // Get metafields for each product
      $obj.metafield = await ProductService.metafields($obj.product_id)

      return $obj as TObject
    })

    return await Promise.all(objects)
  }

  /**
   * Returns an array of metafields for a product resource.
   *
   * @async
   * @param id - ID of product to get metafields for
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
    id: IProductListing['product_id'],
    params: FindMetafieldParams = {}
  ): Promise<PartialOr<IMetafield>[]> {
    const config: Parameters<typeof axiosShopify>[0] = {
      method: 'get',
      params,
      url: `products/${id}/metafields`
    }

    return (await axiosShopify<SAR.Metafields>(config)).metafields
  }

  /**
   * Converts a product query object into an Algolia search options object.
   *
   * @see https://www.algolia.com/doc/api-reference/api-parameters/filters/
   *
   * @param query - Product query from API request
   * @param query.fields - Comma-separated list of product fields to include
   * @param query.handle - Find product listing by product handle
   * @param query.product_id - Find product listing by product ID
   */
  static searchOptions(query: Query = {}): SearchOptions {
    const { product_id, ...rest } = query

    // Get default search options
    const options = shopifySearchOptions(rest)

    // Initialize search filters array
    const filters: string[] = options.filters?.length ? [options.filters] : []

    // Add product_id filter
    if (!isEmpty(product_id)) filters.push(`product_id = ${product_id}`)

    // Add product_id to attributes
    const attributes = options.attributesToRetrieve?.concat(['product_id'])

    return {
      ...options,
      attributesToRetrieve: uniq(attributes),
      filters: join(filters, EMPTY_SPACE)
    }
  }

  /**
   * Returns an object with SEO data for a product listing resource.
   *
   * @async
   * @param listing - Product listing data
   * @param sku - SKU of variant to generate SEO for (optional)
   */
  static async seo(
    listing: IProductListing | Promise<IProductListing>,
    sku: IProductListingVariant['sku'] = ''
  ): Promise<SEOData> {
    listing = await listing

    const { available, images = [], variants, vendor } = listing

    // Initialize SEO object
    let seo: SEOData = {
      description: stripHtml(listing.body_html).result,
      keywords: join(uniq(listing.tags?.trim().split(',')), ''),
      twitter: { card: 'summary' }
    }

    if (variants.length) {
      // Get index of active variant
      let active = 0
      if (!isEmpty(sku)) active = findIndex(variants, v => v.sku === sku)

      // Get active product variant
      const variant = variants[active < 0 ? 0 : active]
      const { image_id } = variant

      // Get SEO title
      const title = `${listing.title} - ${variant.title}`

      // Get product variant image
      let variant_img = images.find(({ id }) => id === image_id)

      if (!variant_img) {
        variant_img = { ...DEFAULT_SEO_IMAGE_DATA, alt: title } as IProductImage
      }

      // Update SEO data
      seo = merge(seo, {
        og: {
          image: variant_img.src,
          'image:alt': variant_img.alt || null,
          'image:height': variant_img.height,
          'image:secure_url': variant_img.src,
          'image:width': variant_img.width,
          'product:availability': available ? `${available}` : null,
          'product:brand': vendor || null,
          'product:condition': 'new',
          'product:price:amount': variant.price,
          'product:price:currency': 'USD'
        },
        title,
        twitter: { image: variant_img.src }
      })
    } else {
      const image = images[0] || DEFAULT_SEO_IMAGE_DATA

      seo = merge(seo, {
        og: {
          image: image.src,
          'image:alt': image.alt || null,
          'image:height': image.height,
          'image:secure_url': image.src,
          'image:width': image.width,
          'product:availability': 'true',
          'product:brand': vendor || null,
          'product:condition': 'new',
          'product:price:currency': 'USD'
        },
        title: listing.title,
        twitter: { image: image.src }
      })
    }

    return seo
  }
}
