import ShopifyBuy from 'shopify-buy'

/**
 * @file Shopify JS Buy SDK Configuration
 * @module config/shopify-buy
 * @see https://github.com/Shopify/js-buy-sdk
 */

export const ShopifyBuyClient = ShopifyBuy.buildClient({
  domain: process.env.SHOPIFY_DOMAIN as string,
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN as string
})

export const Checkouts = ShopifyBuyClient.checkout
export const Collections = ShopifyBuyClient.collection
export const Products = ShopifyBuyClient.product

export default ShopifyBuy
