import type { AnyObject } from '@flex-development/json/utils/types'
import type {
  ICheckoutLineItem,
  ICollectionListing,
  IMetafield,
  IPage,
  IPolicy as IShopifyPolicy,
  IProductListing as IShopifyProductListing,
  IProductListingVariant
} from 'shopify-api-node'

/**
 * @file Type Declarations - Shopify
 * @module types/shopify
 */

/**
 * Shopping cart context state.
 */
export type CartContextState = {
  items: Array<CheckoutLineItemInput>
  items_total: number
  removeItem: (variant_id: number | string) => void
  upsertItem: (data: CheckoutPermalinkInput) => void
  url: string
}

/**
 * Types of cart line items.
 */
export type CheckoutPermalinkInput =
  | CheckoutLineItemInput
  | CheckoutLineItemInputWithId

/**
 * Object representing a checkout permalink query object.
 */
export type CheckoutPermalinkQuery = Record<
  ICheckoutLineItem['variant_id'],
  ICheckoutLineItem['quantity']
>

/**
 * Object representing the fields needed to create a checkout.
 */
export type CheckoutLineItemInput = {
  price: IProductListingVariant['price']
  product: IProductListing
  properties: AnyObject | null
  quantity: ICheckoutLineItem['quantity']
  variant_id: IProductListingVariant['id']
}

/**
 * `CheckoutLineItemInput` with a required `id` property.
 */
export type CheckoutLineItemInputWithId = CheckoutLineItemInput & {
  id: CheckoutLineItemInput['variant_id']
}

/**
 * Shopify `Policy` with missing handle property.
 */
export interface IPolicy extends IShopifyPolicy {
  handle: string
}

/**
 * Shopify `Product` resource with missing properties.
 */
export interface IProductListing extends IShopifyProductListing {
  available: boolean
  vendor: string
}

/**
 * Shopify API responses.
 */
export namespace ShopifyAPIResponses {
  export type CollectionListing = { collection_listings: ICollectionListing[] }
  export type Menus = { menus: ShopifyMenu[] }
  export type Metafields = { metafields: IMetafield[] }
  export type Pages = { pages: IPage[] }
  export type Policies = { policies: IPolicy[] }
  export type ProductListing = { product_listings: IProductListing[] }
}

/**
 * Shopify menu type.
 */
export type ShopifyMenu = {
  handle: string
  levels: number
  links: ShopifyMenuLink[]
  title: string
}

/**
 * Shopify menu link type.
 */
export type ShopifyMenuLink = {
  href: string
  links: ShopifyMenuLink[]
  title: string
}

export type {
  ICheckout,
  ICheckoutLineItem,
  ICollectionListing,
  ICustomer,
  IMetafield,
  IObjectMetafield,
  IPage,
  IProductImage,
  IProductListingVariant
} from 'shopify-api-node'
