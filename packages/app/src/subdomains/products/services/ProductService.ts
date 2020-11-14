import ShopifyBuy, { ShopifyBuyClient } from '@app/config/shopify-buy'
import { createError, Logger, QEData, QueryExecutor } from '@app/subdomains/app'
import { ProductResource } from '@flex-development/kustomzdesign/types'
import slugify from 'slugify'
import { IProductService, ProductQuery } from '../interfaces/IProductService'
import { toImageResource } from '../utils'

/**
 * @file Subdomain Services - Product Service
 * @module subdomains/products/services/ProductService
 */

/**
 * Faciliates all actions with Shopify product resources.
 *
 * @class ProductService
 */
export default class ProductService
  extends QueryExecutor<ProductResource>
  implements IProductService {
  shopify: ShopifyBuy.ProductResource

  /**
   * Creates a new Product service instance.
   */
  constructor() {
    super()
    this.shopify = ShopifyBuyClient.product
  }

  /**
   * Converts a GraphQL product object from the Shopify JS Buy SDK into a
   * `ProductResource` object.
   *
   * @param product - Serialized GraphQL product object
   * @returns Formatted product resource object
   */
  static toProductResource(product: ShopifyBuy.Product): ProductResource {
    const { description, id, images, options, title, variants } = product

    const handle = slugify(title).toLowerCase()

    return {
      description,
      handle,
      id: `${id}`,
      images: images.map(img => ({
        ...toImageResource(img),
        alt: `${title} image`
      })),
      options: options.map(({ name, values }, i) => ({
        id: `${handle}-option-${i}`,
        name,
        values: values.map(({ value }) => value)
      })),
      title,
      variants: variants.map(({ available, id, image, price, title }) => ({
        available,
        id: `${id}`,
        image: { ...toImageResource(image), alt: `${title} image` },
        price,
        sku: slugify(title.replace('$', 'S')).toLowerCase(),
        title
      }))
    }
  }

  /**
   * Returns an array of `ProductResource` objects.
   * Data can be sorted, filtered, and paginated using {@param query}.
   *
   * @async
   * @param query - Query parameters
   * @param query.$limit - Maximum number of items to return. To return data
   * from the end of the array, pass a negative value
   * @param query.$select - Pick which fields to include in the result
   * @param query.$skip - Skip the specified number of results
   * @param query.$sort - Property to sort by mapped and order (1 asc, -1 des)
   * @param query[foo] - Object containing queries for specified property
   * @param query[foo].$eq - Matches values that are equal to a specified value
   * @param query[foo].$gt - Matches values where value > query.$gt
   * @param query[foo].$gte - Matches values where value >= query.$gte
   * @param query[foo].$in - Matches any of the values specified in an array
   * @param query[foo].$lt - Matches values where value < query.$lt
   * @param query[foo].$lte - Matches values where value <= query.$lte
   * @param query[foo].$ne - Matches all values where value !== query.$ne
   * @param query[foo].$nin - Matches none of the values specified in an array
   * @returns Array of Product resource objects
   */
  async find(query: ProductQuery = {}): Promise<QEData<ProductResource>> {
    if (!query?.$limit) query.$limit = 250

    const data = await this.shopify.fetchAll(query.$limit).then(p => p)
    const products = data.map(p => ProductService.toProductResource(p))

    return this.query(products, query)
  }

  /**
   * Retrieve a product by ID.
   *
   * @async
   * @param id - ID of product to retrieve
   * @throws {FeathersErrorJSON}
   */
  async get(id: string): Promise<ProductResource> {
    const product = await this.shopify.fetch(id)

    if (!product.id) {
      const data = { errors: { id } }
      const error = createError(`Product with id ${id} not found`, data, 404)

      Logger.error({ 'ProductService.get': error })
      throw error
    }

    return ProductService.toProductResource(product)
  }

  /**
   * Retrieve a product by handle.
   *
   * @async
   * @param handle - Handle of product to retrieve
   * @throws {FeathersErrorJSON}
   */
  async getByHandle(handle: string): Promise<ProductResource> {
    const product = await this.shopify.fetchByHandle(handle)

    if (!product.id) {
      const data = { errors: { handle } }
      const message = `Product with handle ${handle} not found`
      const error = createError(message, data, 404)

      Logger.error({ 'ProductService.getByHandle': error })
      throw error
    }

    return ProductService.toProductResource(product)
  }
}
