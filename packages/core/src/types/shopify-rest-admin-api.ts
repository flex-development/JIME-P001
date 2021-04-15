import type {
  NullishNumber,
  NullishString,
  PartialOr
} from '@flex-development/json'
import { NumberString } from './utils'

/**
 * @file Type Definitions - Shopify REST Admin API (v2021-01)
 * @module types/shopify-rest-admin-api
 * @see https://shopify.dev/docs/admin-api/rest/reference
 */

/**
 * NOTICE: This file does not contain ALL type definitions from the Admin API,
 * only those used for building custom Shopify storefronts and read-only APIs.
 */

/**
 * The order in which products in the collection appear.
 *
 * Possible values:
 *
 * - `alpha-asc`: Alphabetically, in ascending order (A - Z)
 * - `alpha-desc`: Alphabetically, in descending order (Z - A)
 * - `best-selling`: By best-selling products
 * - `created`: Date created, in ascending order (oldest - newest)
 * - `created-desc`: Date created, in descending order (newest - oldest)
 * - `manual`: Order created by the shop owner
 * - `price-asc`: Price, in ascending order (lowest - highest)
 * - `price-desc`: Price, in descending order (highest - lowest)
 */
export type CollectionListingSortOrder =
  | 'alpha-asc'
  | 'alpha-desc'
  | 'best-selling'
  | 'created'
  | 'created-desc'
  | 'manual'
  | 'price-asc'
  | 'price-desc'

/**
 * The marketing subscription opt-in level (as described by the M3AAWG best
 * practices guideline) the customer gave when they consented to receive
 * marketing material by email.
 */
export type CustomerMarketingOptInLevel =
  | 'confirmed_opt_in'
  | 'single_opt_in'
  | 'unknown'
  | null

/**
 * The state of the customer's account with a shop.
 *
 * Possible values:
 *
 * - `declined`: Customer declined email invite to create account
 * - `disabled`: Customer doesn't have active account
 * - `enabled`: Customer created account
 * - `invited`: Customer received email invite to create account
 */
export type CustomerState = 'declined' | 'disabled' | 'enabled' | 'invited'

/**
 * Product collection that a merchant has published to a sales channel.
 *
 * - https://shopify.dev/docs/admin-api/rest/reference/sales-channels/collectionlisting
 */
export interface ICollectionListing {
  /**
   * Description of the collection, complete with HTML formatting.
   */
  readonly body_html: string

  /**
   * Identifies which collection this listing is for.
   */
  readonly collection_id: number

  /**
   * Default product image for collection.
   */
  readonly default_product_image: IProductImage | null

  /**
   * Human-friendly unique string for the collection automatically generated
   * from its title.
   */
  readonly handle: string

  /**
   * Collection display image.
   */
  readonly image: IImage | null

  /**
   * Date and time collection was published (ISO 8601 format).
   */
  readonly published_at: string

  /**
   * Order in which products in the collection appear.
   */
  readonly sort_order: CollectionListingSortOrder

  /**
   * Name of collection.
   */
  readonly title: string

  /**
   * Date and time collection was last modified (ISO 8601 format).
   */
  readonly updated_at: string
}

/**
 * Query parameters accepeted by the `/collection_listings` endpoint.
 */
export type ICollectionListingQuery = {
  /**
   * Number of results to retrieve. Defaults to `50`, maximum `250`.
   *
   * @default 50
   */
  limit?: number
}

/**
 * Response from the  `/collection_listings` endpoint.
 */
export type ICollectionListingResFind = {
  collection_listings: ICollectionListing[]
}

/**
 * Address a customer has entered.
 *
 * - https://shopify.dev/docs/admin-api/rest/reference/customers/customer-address
 */
export interface ICustomerAddress {
  /**
   * Customer's mailing address.
   */
  address1: string

  /**
   * Additional field for the customer's mailing address.
   */
  address2?: NullishString

  /**
   * Customer's city, town, or village.
   */
  city: string

  /**
   * Customer's company.
   */
  company: NullishString

  /**
   * Customer's country.
   */
  country: string

  /**
   * Two-letter country code corresponding to customer's country.
   */
  readonly country_code: string

  /**
   * Customer's normalized country name.
   */
  country_name: string

  /**
   * Unique identifier for the customer.
   */
  customer_id: number

  /**
   * Boolean indicating if this is the customer's default address.
   */
  default: boolean

  /**
   * Customer's first name.
   */
  first_name: string

  /**
   * Unique identifier for the customer's address.
   */
  id: number

  /**
   * Customer's last name.
   */
  last_name: string

  /**
   * Customer's first and last name.
   */
  name: string

  /**
   * Customer's phone number at this address.
   */
  phone: NullishString

  /**
   * Customer's region name. Typically a province, a state, or a prefecture.
   */
  province: string

  /**
   * Two-letter code for the customer’s region.
   */
  readonly province_code: NullishString

  /**
   * Customer's postal code, also known as zip, postcode, Eircode, etc.
   */
  zip: string
}

/**
 * Query parameters accepeted by the `/customers` endpoint.
 */
export type ICustomerQuery = {
  /**
   * Show customers created before a specified date.
   *
   * (format: 2014-04-25T16:15:47-04:00)
   */
  created_at_max?: ICustomer['created_at']

  /**
   * Show customers created after a specified date.
   *
   * (format: 2014-04-25T16:15:47-04:00)
   */
  created_at_min?: ICustomer['created_at']

  /**
   * Comma-separated list of fields to show.
   */
  fields?: string

  /**
   * Restrict results to customers specified by a comma-separated list of IDs.
   */
  ids?: string

  /**
   * Number of results to retrieve. Defaults to `50`, maximum `250`.
   *
   * @default 50
   */
  limit?: number

  /**
   * Restrict results to those after the specified ID.
   */
  since_id?: ICustomer['id']

  /**
   * Show customers modified before a specified date.
   *
   * (format: 2014-04-25T16:15:47-04:00)
   */
  updated_at_max?: ICustomer['updated_at']

  /**
   * Show customers modified after a specified date.
   *
   * (format: 2014-04-25T16:15:47-04:00)
   */
  updated_at_min?: ICustomer['updated_at']
}

/**
 * Response from the `/customers` endpoint.
 */
export type ICustomerResFind = { customers: PartialOr<ICustomer>[] }

/**
 * Information about a shop customer including their contact details, their
 * order history, and whether they've agreed to receive email marketing.
 *
 * - https://shopify.dev/docs/admin-api/rest/reference/customers/customer
 */
export interface ICustomer {
  /**
   * If customer has consented to marketing material via email.
   */
  accepts_marketing: boolean

  /**
   * Date and time the customer's marketing material settings were modified (ISO
   * 8601 format).
   */
  accepts_marketing_updated_at: string

  /**
   * Shopify Admin GraphQL ID for the customer.
   */
  admin_graphql_api_id: string

  /**
   * List of the ten most recently updated addresses for the customer.
   */
  addresses: ICustomerAddress[]

  /**
   * Date and time when the customer was created (ISO 8601 format).
   */
  created_at: string

  /**
   * Three-letter code (ISO 4217 format) for the currency the customer used when
   * they paid for their last order.
   *
   * Defaults to the shop currency.
   *
   * Returns the shop currency for test orders.
   */
  currency: string

  /**
   * Default address for the customer.
   */
  default_address: ICustomerAddress

  /**
   * Unique email address of the customer.
   */
  email: string

  /**
   * Customer's first name.
   */
  first_name: string

  /**
   * Unique identifier for the customer.
   */
  id: number

  /**
   * Customer's last name.
   */
  last_name: string

  /**
   * ID of the customer's last order.
   */
  readonly last_order_id: NullishNumber

  /**
   * Name of the customer's last order.
   *
   * Directly related to the `name` field on the Order resource.
   */
  readonly last_order_name: NullishString

  /**
   * Marketing subscription opt-in level (as described by the M3AAWG best
   * practices guideline) the customer gave when they consented to receive
   * marketing material by email.
   */
  marketing_opt_in_level: CustomerMarketingOptInLevel

  /**
   * Unique identifier for the customer that's used with Multipass login.
   */
  multipass_identifier: NullishNumber

  /**
   * Note about the customer.
   */
  note: NullishString

  /**
   * Number of orders associated with this customer.
   */
  readonly orders_count: number

  /**
   * Unique phone number (E.164 format) for this customer. Attempting to
   * assign the same phone number to multiple customers returns an error.
   */
  phone: string

  /**
   * State of the customer's account with a shop.
   */
  readonly state: CustomerState

  /**
   * Tags the shop owner has attached to the customer, formatted as a
   * string of comma-separated values.
   *
   * A customer can have up to 250 tags. Each tag can have up to 255 characters.
   */
  tags: NullishString

  /**
   * Whether customer is exempt from paying taxes on their order.
   *
   * - `false`: taxes will be applied at checkout
   * - `true`: taxes won't be applied to an order at checkout
   */
  tax_exempt: boolean

  /**
   * Canadian tax exemption codes.
   */
  tax_exemptions: string[]

  /**
   * Total amount of money customer has spent across their order history.
   * NOT prefixed with a "$" sign.
   */
  readonly total_spent: string

  /**
   * Date and time customer was last modified (ISO 8601 format).
   */
  readonly updated_at: string

  /**
   * Boolean indicating if customer has verified their email address.
   */
  readonly verified_email: boolean
}

/**
 * Shopify image.
 */
export interface IImage {
  /**
   * Image description.
   */
  alt?: NullishString

  /**
   * Date and time image was created (ISO 8601 format).
   */
  readonly created_at: string

  /**
   * Image height.
   */
  height: number

  /**
   * Unique identifier for the image.
   */
  readonly id: number

  /**
   * Image URL.
   */
  readonly src: string

  /**
   * Date and time image was last modified (ISO 8601 format).
   */
  readonly updated_at: string

  /**
   * Image width.
   */
  width: number
}

/**
 * Object representing a Shopify menu link.
 */
export type IMenuLink = {
  readonly href: string
  readonly links: IMenuLink[]
  readonly title: string
}

/**
 * Response from the `/pages/api-menus` endpoint.
 */
export type IMenuResFind = { menus: IMenu[] }

/**
 * Object representing a Shopify menu.
 */
export type IMenu = {
  readonly handle: string
  readonly levels: number
  readonly links: IMenuLink[]
  readonly title: string
}

/**
 * Query parameters accepted by the `/metafields/*` endpoints.
 */
export type IMetafieldQuery = {
  /**
   * Show metafields created before date.
   *
   * (format: 2014-04-25T16:15:47-04:00)
   */
  created_at_max?: IMetafield['created_at']

  /**
   * Show metafields created after date.
   *
   * (format: 2014-04-25T16:15:47-04:00)
   */
  created_at_min?: IMetafield['created_at']

  /**
   * Comma-separated list of fields to show.
   */
  fields?: string

  /**
   * Show metafields with given key.
   */
  key?: string

  /**
   * Number of results to retrieve. Defaults to `50`, maximum `250`.
   *
   * @default 50
   */
  limit?: number

  /**
   * Show metafields with given namespace.
   */
  namespace?: string

  /**
   * Show metafields modified before date.
   *
   * (format: 2014-04-25T16:15:47-04:00).
   */
  updated_at_max?: IMetafield['updated_at']

  /**
   * Show metafields modified after date.
   *
   * (format: 2014-04-25T16:15:47-04:00).
   */
  updated_at_min?: IMetafield['updated_at']

  /**
   * Show metafields with a given value_type:
   *
   * - `integer`: Show only metafields with integer value types
   * - `json_string`: Show only metafields with json_string value types
   * - `string`: Show only metafields with string value types
   */
  value_type?: MetaFieldValueType
}

/**
 * Response from the `/metafields` endpoint.
 */
export type IMetafieldResFind = { metafields: PartialOr<IMetafield>[] }

/**
 * Additional information about Admin API resources.
 *
 * - https://shopify.dev/docs/admin-api/rest/reference/metafield
 */
export interface IMetafield {
  /**
   * Shopify Admin GraphQL ID for the metafield.
   */
  readonly admin_graphql_api_id: string

  /**
   * Date and time the metafield was created (ISO 8601 format).
   */
  readonly created_at: string

  /**
   * Description of the information the metafield contains.
   */
  readonly description: NullishString

  /**
   * Unique ID of the metafield.
   */
  readonly id: number

  /**
   * Name of the metafield. Between 3 and 50 characters.
   */
  readonly key: string

  /**
   * Name of a set of metafields. Between 2 and 20 characters.
   */
  readonly namespace: string

  /**
   * Unique ID of the resource the metafield is attached to.
   */
  owner_id: number

  /**
   * Type of resource the metafield is attached to.
   */
  owner_resource: MetaFieldOwnerResource

  /**
   * Date and time the metafield was last modified (ISO 8601 format).
   */
  readonly updated_at: string

  /**
   * Information to be stored as metadata.
   *
   * Maximum length: 512 characters when metafield namespace is equal to `tags`
   * and key is equal to `alt`.
   *
   * The maximum length of `value` depends on `value_type`:
   *
   * - `integer`: 100,000 characters
   * - `json_string`: 100,000 characters
   * - `string`: 5,000,000 characters
   */
  readonly value: NumberString

  /**
   * Metafield's information type.
   */
  readonly value_type: MetaFieldValueType
}

/**
 * Query parameters accepeted by the `/pages` endpoint.
 */
export type IPageQuery = {
  /**
   * Show pages created before a specified date.
   *
   * (format: 2014-04-25T16:15:47-04:00)
   */
  created_at_max?: IPage['created_at']

  /**
   * Show pages created after a specified date.
   *
   * (format: 2014-04-25T16:15:47-04:00)
   */
  created_at_min?: IPage['created_at']

  /**
   * Comma-separated list of fields to show.
   */
  fields?: string

  /**
   * Retrieve a page with a given handle.
   */
  handle?: IPage['handle']

  /**
   * Restrict results to pages specified by a comma-separated list of IDs.
   */
  ids?: string

  /**
   * Number of results to retrieve. Defaults to `50`, maximum `250`.
   *
   * @default 50
   */
  limit?: number

  /**
   * Show pages published before a specified date.
   *
   * (format: 2014-04-25T16:15:47-04:00)
   */
  published_at_max?: IPage['published_at']

  /**
   * Show pages published after a specified date.
   *
   * (format: 2014-04-25T16:15:47-04:00)
   */
  published_at_min?: IPage['published_at']

  /**
   * Restrict results to pages with a given published status.
   *
   * @default 'any'
   */
  published_status?: PagePublishedStatus

  /**
   * Restrict results to those after the specified ID.
   */
  since_id?: IPage['id']

  /**
   * Retrieve pages with a given title.
   */
  title?: IPage['title']

  /**
   * Show pages modified before a specified date.
   *
   * (format: 2014-04-25T16:15:47-04:00)
   */
  updated_at_max?: IPage['updated_at']

  /**
   * Show pages modified after a specified date.
   *
   * (format: 2014-04-25T16:15:47-04:00)
   */
  updated_at_min?: IPage['updated_at']
}

/**
 * Response from the `/pages` endpoint.
 */
export type IPageResFind = { pages: PartialOr<IPage>[] }

/**
 * Online store page.
 *
 * - https://shopify.dev/docs/admin-api/rest/reference/online-store/page
 */
export interface IPage {
  /**
   * Shopify Admin GraphQL ID for the page.
   */
  readonly admin_graphql_api_id: string

  /**
   * Name of the person who created the page.
   */
  readonly author: NullishString

  /**
   * Text content of the page, complete with HTML markup.
   */
  readonly body_html: string

  /**
   * Date and time page was created (ISO 8601 format).
   */
  readonly created_at: string

  /**
   * Unique, human-friendly string for the page, generated automatically from
   * its title.
   */
  readonly handle: string

  /**
   * Unique numeric identifier for the page.
   */
  readonly id: number

  /**
   * Date and time page was published (ISO 8601 format).
   *
   * Returns `null` when the page is hidden.
   */
  readonly published_at: NullishString

  /**
   * ID of the shop to which the page belongs.
   */
  readonly shop_id: number

  /**
   * Suffix of the Liquid template being used.
   *
   * For example, if the value is `contact`, then the page is using the
   * `page.contact.liquid` template.
   *
   * If the value is an empty string, then the page is using the default
   * `page.liquid` template.
   */
  readonly template_suffix: NullishString

  /**
   * Page's title.
   */
  readonly title: string

  /**
   * Date and time page was last modified (ISO 8601 format).
   */
  readonly updated_at: string
}

/**
 * Response from the `/policies` endpoint.
 */
export type IPolicyResFind = { policies: IPolicy[] }

/**
 * Store policy.
 *
 * - https://shopify.dev/docs/admin-api/rest/reference/store-properties/policy
 */
export interface IPolicy {
  /**
   * Description of the policy.
   */
  body: string

  /**
   * Date and time policy was created (ISO 8601 format).
   */
  created_at: string

  /**
   * Unique identifer for the policy used to build the policy's URL.
   */
  handle: string

  /**
   * Name of the policy.
   */
  title: string

  /**
   * Date and time policy was last modified (ISO 8601 format).
   */
  updated_at: string

  /**
   * Public URL of the policy.
   */
  url: string
}

/**
 * Product (listing) image.
 */
export interface IProductImage extends IImage {
  /**
   * Shopify Admin GraphQL ID for the product image.
   */
  admin_graphql_api_id?: string

  /**
   * Order of the product image in the list of product images from 1.
   */
  position: number

  /**
   * Unique identifier for the product this image is associated with.
   */
  product_id: IProductListing['product_id']

  /**
   * List of product variant IDs associated with this image.
   */
  variant_ids: IProductListingVariant['id'][]
}

/**
 * Query parameters accepeted by the `/product_listings` endpoint.
 */
export type IProductListingQuery = {
  /**
   * Filter by products belonging to a particular collection.
   */
  collection_id?: ICollectionListing['collection_id']

  /**
   * Filter by product handle.
   */
  handle?: IProductListing['handle']

  /**
   * Number of results to retrieve. Defaults to `50`, maximum `250`.
   *
   * @default 50
   */
  limit?: number

  /**
   * A comma-separated list of product ids.
   */
  product_ids?: string

  /**
   * Filter by product listings last updated after a certain date and time
   * (formatted in ISO 8601).
   */
  updated_at_min?: IProductListing['updated_at']
}

/**
 * Response from the `/product_listings` endpoint.
 */
export type IProductListingResFind = {
  product_listings: IProductListing[]
}

/**
 * Product option associated with a `IProductListingVariant` resource.
 */
export interface IProductListingVariantOptionValue {
  /**
   * Name of product option.
   */
  name: IProductOption['name']

  /**
   * Unique identifier for the product option.
   */
  option_id: IProductOption['id']

  /**
   * Product option value the variant represents.
   */
  value: string
}

/**
 * Product variant published to a sales channel.
 */
export interface IProductListingVariant {
  /**
   * Boolean indicating if the product variant is in-stock.
   */
  available: boolean

  /**
   * Barcode, UPC or ISBN number for the product.
   */
  barcode: string

  /**
   * Competitor's price for the same item.
   */
  compare_at_price: NullishString

  /**
   * Date and time the product variant was created (ISO 8601 format).
   */
  created_at: string

  /**
   * Price of the product variant, formatted as a money string.
   */
  formatted_price: string

  /**
   * Service which is handling fulfillment.
   */
  fulfillment_service: string

  /**
   * Weight of the product variant in grams.
   */
  grams: number

  /**
   * Unique numeric identifier for the product variant.
   */
  id: number

  /**
   * ID of the product image associated with this variant.
   */
  image_id: NullishNumber

  /**
   * Specifies whether or not Shopify tracks the number of items in stock for
   * this product variant.
   */
  inventory_management: string

  /**
   * Specifies whether or not customers are allowed to place an order for a
   * product variant when it's out of stock.
   */
  inventory_policy: ProductVariantInventoryPolicy

  /**
   * The number of items in stock for this product variant.
   */
  readonly inventory_quantity: number

  /**
   * Product options associated with this product variant.
   */
  option_values: IProductListingVariantOptionValue[]

  /**
   * Order of the product variant in the list of product variants.
   * 1 is the first position.
   */
  position: number

  /**
   * Price of the product variant.
   */
  price: string

  /**
   * Specifies whether or not a customer needs to provide a shipping address
   * when placing an order for this product variant.
   */
  requires_shipping: boolean

  /**
   * Unique identifier for the product in the shop.
   */
  sku: string

  /**
   * Specifies whether or not a tax is charged when the product variant is sold.
   */
  taxable: boolean

  /**
   * The title of the product variant.
   */
  title: string

  /**
   * The date and time when the product variant was last modified in ISO_8601
   * format.
   */
  updated_at: string

  /**
   * The weight of the product variant in the unit system specified with
   * `weight_unit`.
   */
  weight: number

  /**
   * The unit system the product variant's weight is measure in.
   */
  weight_unit: ProductVariantWeightUnit
}

/**
 * Product published to a sales channel.
 *
 * - https://shopify.dev/docs/admin-api/rest/reference/sales-channels/productlisting
 */
export interface IProductListing {
  /**
   * Boolean indicating if the product is in-stock.
   */
  readonly available: boolean

  /**
   * The description of the product, complete with HTML formatting.
   */
  readonly body_html: string

  /**
   * The date and time when the product was created in ISO_8601 format.
   */
  readonly created_at: string

  /**
   * A human-friendly unique string for the Product automatically generated from
   * its title.
   */
  readonly handle: string

  /**
   * A list of image objects, each one representing an image associated with the
   * product.
   */
  readonly images: IProductImage[]

  /**
   * Custom product property names like "Size", "Color", and "Material".
   */
  readonly options: IProductOption[]

  /**
   * Unique identifer of the product this listing is for.
   * The primary key for this resource.
   */
  readonly product_id: number

  /**
   * A categorization that a product can be tagged with, commonly used for
   * filtering.
   */
  readonly product_type: string

  /**
   * The date and time when the product was published in ISO_8601 format.
   */
  readonly published_at: string

  /**
   * A categorization that a product can be tagged with, commonly used for
   * filtering.
   */
  readonly tags: string

  /**
   * The name of the product.
   */
  readonly title: string

  /**
   * The date and time when the product was last modified in ISO_8601 format.
   */
  readonly updated_at: string

  /**
   * A list of variant objects, each one representing a slightly different
   * version of the product.
   *
   * For example, if a product comes in different sizes and colors, each size
   * and color permutation (such as "small black", "medium black", "large
   * blue"), would be a variant.
   */
  readonly variants: IProductListingVariant[]

  /**
   * The name of the vendor of the product.
   */
  readonly vendor: string
}

/**
 * Custom product property.
 */
export interface IProductOption {
  /**
   * Unique identifier for the product option.
   */
  id: number

  /**
   * Name of product option.
   */
  name: string

  /**
   * The order of the product option in the list of product options.
   * 1 is the first position.
   */
  position: number

  /**
   * Unique identifier for the associated product.
   */
  product_id: number

  /**
   * Possible values for the product option.
   */
  values: string[]
}

/**
 * The type of resource that a `IMetafield` resource is attached to.
 */
export type MetaFieldOwnerResource =
  | 'article'
  | 'blog'
  | 'customer'
  | 'draft_order'
  | 'order'
  | 'page'
  | 'product'
  | 'product_image'
  | 'product_variant'
  | 'shop'

/**
 * The `IMetafield` resource information type.
 */
export type MetaFieldValueType = 'integer' | 'json_string' | 'string'

/**
 * `IPage` resource published status:
 *
 * - `any`: Published and unpublished pages
 * - `published`: Only published pages
 * - `unpublished`: Only unpublished pages
 */
export enum PagePublishedStatus {
  ANY = 'any',
  PUBLISHED = 'published',
  UNPUBLISHED = 'unpublished'
}

/**
 * Specifies whether or not customers are allowed to place an order for a
 * product variant when it's out of stock.
 */
export type ProductVariantInventoryPolicy = 'continue' | 'deny'

/**
 * The unit system a `IProductListingVariant` resource's weight is measured in.
 */
export type ProductVariantWeightUnit = 'g' | 'kg' | 'lb' | 'oz'

/**
 * Shopify image sizes mapped to dimensions.
 */
export enum ShopifyImageSize {
  BIG = '1024x1024',
  COMPACT = '160x160',
  HUGE = '2048x2048',
  GRANDE = '600x600',
  ICON = '32x32',
  LARGE = '480x480',
  MEDIUM = '240x240',
  ORIGINAL = 'master',
  PICO = '16x16',
  THUMB = '50x50'
}
