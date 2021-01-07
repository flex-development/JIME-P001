import { AnyObject, NullishString } from '@flex-development/json'
import {
  ICheckoutLineItem,
  ICollectionListing,
  IMetafield,
  IPage,
  IPolicy as IShopifyPolicy,
  IProductListing
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
 * Object representing the fields needed to display a checkout line item.
 */
export type CheckoutLineItemDisplay = Pick<
  ICheckoutLineItem,
  'price' | 'quantity' | 'title' | 'variant_id'
> & { properties: AnyObject | null }

/**
 * Object representing the fields needed to create a checkout.
 */
export type CheckoutLineItemInput = {
  data: CheckoutLineItemDisplay
  image: { alt?: NullishString; id?: string; src?: string }
}

/**
 * `CheckoutLineItemInput` with a required `id` property.
 */
export type CheckoutLineItemInputWithId = CheckoutLineItemInput & {
  id: CheckoutLineItemInput['data']['variant_id']
}

/**
 * Shopify `Policy` with missing handle property.
 */
export interface IPolicy extends IShopifyPolicy {
  handle: string
}

/**
 * Object containing Shopify store metafields under the `settings` namespace.
 */
export type SettingsNamespaceMetafields = Record<string, IMetafield>

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
  url: string
}

/**
 * Shopify menu link type.
 */
export type ShopifyMenuLink = {
  links: ShopifyMenuLink[]
  title: string
  url: string
}

/**
 * Store hero and sidebar metadata.
 */
export type StoreLayoutSettings = {
  hero_subtitle: string
  hero_title: string
  sidebar_age: string
  sidebar_img: string
  sidebar_location: string
  sidebar_mood: string
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
  IProductListing,
  IProductListingVariant
} from 'shopify-api-node'
