import ShopifyBuyClient from 'shopify-buy'

/**
 * @file Shopify JS Buy SDK Configuration
 * @module subdomains/config/shopify-buy
 * @see https://github.com/Shopify/js-buy-sdk
 */

export const ShopifyBuy = ShopifyBuyClient.buildClient({
  domain: process.env.SHOPIFY_DOMAIN as string,
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN as string
})

export const Checkouts = ShopifyBuy.checkout
export const Collections = ShopifyBuy.collection
export const Products = ShopifyBuy.product
