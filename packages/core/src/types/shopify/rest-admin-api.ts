import type {
  NullishNumber,
  NullishString,
  PartialOr
} from '@flex-development/json'
import { NumberString } from '../utils'

/**
 * @file Type Definitions - Shopify REST Admin API (v2021-01)
 * @module types/shopify/rest-admin-api
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
 * - `created`: By date created, in ascending order (oldest - newest)
 * - `created-desc`: By date created, in descending order (newest - oldest)
 * - `manual`: Order created by the shop owner
 * - `price-asc`: By price, in ascending order (lowest - highest)
 * - `price-desc`: By price, in descending order (highest - lowest)
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
 * practices guideline) that the customer gave when they consented to receive
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
 * - `declined`: Customer declined the email invite to create an account
 * - `disabled`: Customer doesn't have an active account
 * - `enabled`: Customer has created an account
 * - `invited`: Customer has received an email invite to create an account
 */
export type CustomerState = 'declined' | 'disabled' | 'enabled' | 'invited'

/**
 * Product collection that a merchant has published to a sales channel.
 *
 * - https://shopify.dev/docs/admin-api/rest/reference/sales-channels/collectionlisting
 */
export interface ICollectionListing {
  /**
   * The description of the collection, complete with HTML formatting.
   */
  readonly body_html: string

  /**
   * Identifies which collection this listing is for.
   */
  readonly collection_id: number

  /**
   * The default product image for a collection.
   */
  readonly default_product_image: IProductImage | null

  /**
   * A human-friendly unique string for the Collection automatically generated
   * from its title.
   */
  readonly handle: string

  /**
   * The image for a collection.
   */
  readonly image: IImage | null

  /**
   * The date and time when the collection was published in ISO_8601 format.
   */
  readonly published_at: string

  /**
   * The order in which products in the collection appear.
   */
  readonly sort_order: CollectionListingSortOrder

  /**
   * The name of the collection.
   */
  readonly title: string

  /**
   * The date and time when the collection was last modified in ISO_8601 format.
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
 * Information about a shop customer including their contact details, their
 * order history, and whether they've agreed to receive email marketing.
 *
 * - https://shopify.dev/docs/admin-api/rest/reference/customers/customer
 */
export interface ICustomer {
  /**
   * Whether the customer has consented to receive marketing material via email.
   */
  accepts_marketing: boolean

  /**
   * Shopify Admin GraphQL id for the customer.
   */
  admin_graphql_api_id: string

  /**
   * A list of the ten most recently updated addresses for the customer.
   */
  addresses: ICustomerAddress[]

  /**
   * The date and time (ISO 8601 format) when the customer was created.
   */
  created_at: string

  /**
   * The three-letter code (ISO 4217 format) for the currency that the customer
   * used when they paid for their last order.
   *
   * Defaults to the shop currency.
   *
   * Returns the shop currency for test orders.
   */
  currency: string

  /**
   * The default address for the customer.
   */
  default_address: ICustomerAddress

  /**
   * The unique email address of the customer.
   */
  email: string

  /**
   * The customer's first name.
   */
  first_name: string

  /**
   * A unique identifier for the customer.
   */
  id: number

  /**
   * The customer's last name.
   */
  last_name: string

  /**
   * The ID of the customer's last order.
   */
  readonly last_order_id: NullishNumber

  /**
   * The name of the customer's last order.
   *
   * This is directly related to the `name` field on the Order resource.
   */
  readonly last_order_name: NullishString

  /**
   * The marketing subscription opt-in level (as described by the M3AAWG best
   * practices guideline) that the customer gave when they consented to receive
   * marketing material by email.
   */
  marketing_opt_in_level: CustomerMarketingOptInLevel

  /**
   * A unique identifier for the customer that's used with Multipass login.
   */
  multipass_identifier: NullishNumber

  /**
   * A note about the customer.
   */
  note: NullishString

  /**
   * The number of orders associated with this customer.
   */
  readonly orders_count: number

  /**
   * The unique phone number (E.164 format) for this customer. Attempting to
   * assign the same phone number to multiple customers returns an error.
   */
  phone: string

  /**
   * The state of the customer's account with a shop.
   */
  readonly state: CustomerState

  /**
   * Tags that the shop owner has attached to the customer, formatted as a
   * string of comma-separated values.
   *
   * A customer can have up to 250 tags. Each tag can have up to 255 characters.
   */
  tags: string

  /**
   * Whether the customer is exempt from paying taxes on their order.
   *
   * If `true`, then taxes won't be applied to an order at checkout.
   * If `false`, then taxes will be applied at checkout.
   */
  tax_exempt: boolean

  /**
   * The total amount of money that the customer has spent across their order
   * history. NOT prefixed with a "$" sign.
   */
  readonly total_spent: string

  /**
   * The date and time (ISO 8601 format) when the customer information was last
   * updated.
   */
  readonly updated_at: string

  /**
   * Whether the customer has verified their email address.
   */
  readonly verified_email: boolean
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
 * Address a customer has entered.
 *
 * - https://shopify.dev/docs/admin-api/rest/reference/customers/customer-address
 */
export interface ICustomerAddress {
  /**
   * The customer's mailing address.
   */
  address1: string

  /**
   * An additional field for the customer's mailing address.
   */
  address2?: string

  /**
   * The customer's city, town, or village.
   */
  city: string

  /**
   * The customer’s company.
   */
  company: NullishString

  /**
   * The customer's country.
   */
  country: string

  /**
   * The two-letter country code corresponding to the customer's country.
   */
  readonly country_code: string

  /**
   * The customer’s normalized country name.
   */
  country_name: string

  /**
   * A unique identifier for the customer.
   */
  customer_id: number

  /**
   * Boolean indicating if this is the customer's default address.
   */
  default: boolean

  /**
   * The customer’s first name.
   */
  first_name: string

  /**
   * A unique identifier for the customer's address.
   */
  id: number

  /**
   * The customer’s last name.
   */
  last_name: string

  /**
   * The customer’s first and last name.
   */
  name: string

  /**
   * The customer’s phone number at this address.
   */
  phone: NullishString

  /**
   * The customer’s region name. Typically a province, a state, or a prefecture.
   */
  province: string

  /**
   * The two-letter code for the customer’s region.
   */
  readonly province_code: NullishString

  /**
   * The customer’s postal code, also known as zip, postcode, Eircode, etc.
   */
  zip: string
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
   * The date and time (ISO 8601 format) when the image created.
   */
  created_at: string

  /**
   * Image height.
   */
  height: number

  /**
   * A unique identifier for the image.
   */
  id: number

  /**
   * Shopify image URL.
   */
  src: string

  /**
   * The date and time (ISO 8601 format) when the image was last updated.
   */
  updated_at: string

  /**
   * Image width.
   */
  width: number
}

/**
 * Object representing a Shopify menu.
 */
export type IMenu = {
  handle: string
  levels: number
  links: IMenuLink[]
  title: string
}

/**
 * Response from the `/pages/api-menus` endpoint.
 */
export type IMenuResFind = { menus: IMenu[] }

/**
 * Object representing a Shopify menu link.
 */
export type IMenuLink = {
  href: string
  links: IMenuLink[]
  title: string
}

/**
 * Additional information about Admin API resources.
 *
 * - https://shopify.dev/docs/admin-api/rest/reference/metafield
 */
export interface IMetafield {
  /**
   * Shopify Admin GraphQL id for the metafield.
   */
  readonly admin_graphql_api_id: string

  /**
   * The date and time (ISO 8601 format) when the metafield was created.
   */
  readonly created_at: string

  /**
   * A description of the information that the metafield contains.
   */
  readonly description: NullishString

  /**
   * The unique ID of the metafield.
   */
  readonly id: number

  /**
   * The name of the metafield. Between 3 and 50 characters.
   */
  readonly key: string

  /**
   * A container for a set of metafields. Between 2 and 20 characters.
   */
  readonly namespace: string

  /**
   * The unique ID of the resource that the metafield is attached to.
   */
  owner_id: number

  /**
   * The type of resource that the metafield is attached to.
   */
  owner_resource: MetaFieldOwnerResource

  /**
   * The date and time (ISO 8601 format) when the metafield was last updated.
   */
  readonly updated_at: string

  /**
   * The information to be stored as metadata.
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
   * The metafield's information type.
   */
  readonly value_type: MetaFieldValueType
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
 * Online store page.
 *
 * - https://shopify.dev/docs/admin-api/rest/reference/online-store/page
 */
export interface IPage {
  /**
   * Shopify Admin GraphQL id for the page.
   */
  admin_graphql_api_id: string

  /**
   * The name of the person who created the page.
   */
  author: NullishString

  /**
   * The text content of the page, complete with HTML markup.
   */
  body_html: string

  /**
   * The date and time (ISO 8601 format) when the page was created.
   */
  readonly created_at: string

  /**
   * A unique, human-friendly string for the page, generated automatically from
   * its title.
   */
  handle: string

  /**
   * The unique numeric identifier for the page.
   */
  readonly id: number

  /**
   * The date and time (ISO 8601 format) when the page was published.
   *
   * Returns `null` when the page is hidden.
   */
  published_at: NullishString

  /**
   * The ID of the shop to which the page belongs.
   */
  readonly shop_id: number

  /**
   * The suffix of the Liquid template being used.
   *
   * For example, if the value is `contact`, then the page is using the
   * `page.contact.liquid` template.
   *
   * If the value is an empty string, then the page is using the default
   * `page.liquid` template.
   */
  template_suffix: NullishString

  /**
   * The page's title.
   */
  title: string

  /**
   * The date and time (ISO 8601 format) when the page was last updated.
   */
  readonly updated_at: string
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
 * Store policy.
 *
 * - https://shopify.dev/docs/admin-api/rest/reference/store-properties/policy
 */
export interface IPolicy {
  /**
   * A description of the policy.
   */
  body: string

  /**
   * The date and time (ISO 8601 format) when the policy was created.
   */
  created_at: string

  /**
   * A unique identifer for the policy used to build the policy's URL.
   */
  handle: string

  /**
   * The name of the policy.
   */
  title: string

  /**
   * The date and time (ISO 8601 format) when the policy was last modified.
   */
  updated_at: string

  /**
   * The public URL of the policy.
   */
  url: string
}

/**
 * Response from the `/policies` endpoint.
 */
export type IPolicyResFind = { policies: IPolicy[] }

/**
 * Product (listing) image.
 */
export interface IProductImage extends IImage {
  /**
   * Shopify Admin GraphQL id for the product image.
   */
  admin_graphql_api_id?: string

  /**
   * The order of the product image in the list of product images.
   * 1 is the first position.
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
   * The unique identifer of the product this listing is for.
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
 * Product variant published to a sales channel.
 */
export interface IProductListingVariant {
  /**
   * Boolean indicating if the product variant is in-stock.
   */
  available: boolean

  /**
   * The barcode, UPC or ISBN number for the product.
   */
  barcode: string

  /**
   * The competitor's price for the same item.
   */
  compare_at_price: NullishString

  /**
   * The date and time when the product variant was created in ISO_8601 format.
   */
  created_at: string

  /**
   * The price of the product variant, formatted as a money string.
   */
  formatted_price: string

  /**
   * Service which is handling fulfillment.
   */
  fulfillment_service: string

  /**
   * The weight of the product variant in grams.
   */
  grams: number

  /**
   * The unique numeric identifier for the product variant.
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
   * The order of the product variant in the list of product variants.
   * 1 is the first position.
   */
  position: number

  /**
   * The price of the product variant.
   */
  price: string

  /**
   * Specifies whether or not a customer needs to provide a shipping address
   * when placing an order for this product variant.
   */
  requires_shipping: boolean

  /**
   * A unique identifier for the product in the shop.
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
   * The unit system that the product variant's weight is measure in.
   */
  weight_unit: ProductVariantWeightUnit
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
export type ProductVariantInventoryPolicy = 'deny' | 'continue'

/**
 * The unit system a `IProductListingVariant` resource's weight is measured in.
 */
export type ProductVariantWeightUnit = 'g' | 'kg' | 'lb' | 'oz'

/**
 * Shopify API responses.
 */
export namespace ShopifyAPIResponses {
  export type CollectionListing = { collection_listings: ICollectionListing[] }
  export type Menus = { menus: IMenu[] }
  export type Metafields = { metafields: IMetafield[] }
  export type Pages = { pages: IPage[] }
  export type Policies = { policies: IPolicy[] }
  export type ProductListing = { product_listings: IProductListing[] }
}
