import ShopifyBuyClient from 'shopify-buy'

/**
 * @file Shopify APIs Configuration
 * @module lib/config/shopify
 *
 * @see https://github.com/MONEI/Shopify-api-node
 * @see https://github.com/Shopify/js-buy-sdk
 *
 * @todo Configure Shopify API Node
 */

export const ShopifyBuy = ShopifyBuyClient.buildClient({
  domain: process.env.SHOPIFY_DOMAIN as string,
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN as string
})

export const Checkouts = ShopifyBuy.checkout
export const Collections = ShopifyBuy.collection
export const Products = ShopifyBuy.product
