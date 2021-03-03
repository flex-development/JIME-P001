import type {
  ICollectionListing,
  IMetafield,
  IPage,
  IPolicy as IShopifyPolicy,
  IProductListing as IShopifyProductListing
} from 'shopify-api-node'

/**
 * @file Type Definitions - Shopify
 * @module types/shopify
 */

/**
 * Shopify `Policy` resource with properties missing from original type
 * definition.
 */
export interface IPolicy extends IShopifyPolicy {
  handle: string
}

/**
 * Shopify `Product` resource with properties missing from original type
 * definition.
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
 * Object representing a Shopify menu.
 */
export type ShopifyMenu = {
  handle: string
  levels: number
  links: ShopifyMenuLink[]
  title: string
}

/**
 * Object representing a Shopify menu link.
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
