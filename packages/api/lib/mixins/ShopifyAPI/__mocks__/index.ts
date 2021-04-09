import type { IProductListingQuery } from '@flex-development/kustomzcore/types'
import CUSTOMERS from '@kapi/tests/fixtures/shopify/customers'
import PAGES from '@kapi/tests/fixtures/shopify/pages'
import POLICIES from '@kapi/tests/fixtures/shopify/policies'
import PRODUCTS from '@kapi/tests/fixtures/shopify/products'
import COLLECTIONS from '../../../../__tests__/__fixtures__/shopify/collections'
import MENUS from '../__tests__/__fixtures__/menus'
import MG_OBJ from '../__tests__/__fixtures__/metafield-globals-obj'

/**
 * @file Mock - ShopifyAPI
 * @module lib/mixins/ShopifyAPI/mocks
 * @see https://jestjs.io/docs/next/manual-mocks#mocking-user-modules
 */

const COLLECTION_PRODUCTS = {
  [`${COLLECTIONS[0].collection_id}`]: PRODUCTS,
  [`${COLLECTIONS[1].collection_id}`]: []
}

const Actual = jest.requireActual('..').default
export default class MockShopifyAPI extends Actual {
  static collectionListings = jest.fn(async () => COLLECTIONS)
  static customers = jest.fn(async () => CUSTOMERS)
  static getProductImage = jest.fn(Actual.getProductImage)
  static menus = jest.fn(async () => MENUS.menus)
  static metafield = jest.fn(async () => [])
  static metafieldGlobals = jest.fn(async () => MG_OBJ)
  static pages = jest.fn(async () => PAGES)
  static policies = jest.fn(async () => POLICIES)
  static productListings = jest.fn((params: IProductListingQuery = {}) => {
    let products = PRODUCTS

    if (params.collection_id) {
      products = COLLECTION_PRODUCTS[params.collection_id] || []
    }

    return Promise.resolve(products)
  })
}
