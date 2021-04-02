import { request } from '@flex-development/kustomzcore/config/axios'
import type { ErrorJSON } from '@flex-development/kustomzcore/types'
import ofa from '@flex-development/kustomzcore/utils/objectFromArray'
import { ShopifyResourceWithMetafield } from '@kapi/types'
import Subject from '..'
import AXIOS_ERROR from './__fixtures__/axios-error'
import METAFIELDS_GLOBAL from './__fixtures__/metafield-globals'

/**
 * @file Unit Tests - Shopify REST Admin API Mixin
 * @module lib/mixins/ShopifyAPI/tests/unit
 */

jest.unmock('@flex-development/kustomzcore/utils/createError')

const mockOFA = ofa as jest.MockedFunction<typeof ofa>
const mockRequest = request as jest.MockedFunction<typeof request>
const spyRequest = jest.spyOn(Subject, 'request')

describe('unit:lib/mixins/ShopifyAPI', () => {
  describe('.collectionListings', () => {
    it('calls .request with correct url and default params.limit', async () => {
      await Subject.collectionListings()

      expect(spyRequest).toBeCalledTimes(1)
      expect(spyRequest).toBeCalledWith({
        params: { limit: 250 },
        url: 'collection_listings'
      })
    })
  })

  describe('.menus', () => {
    it('calls .request with empty config', async () => {
      await Subject.menus()

      expect(spyRequest).toBeCalledTimes(1)
      expect(spyRequest).toBeCalledWith({}, true)
    })
  })

  describe('.metafield', () => {
    it('uses request config for shop', async () => {
      await Subject.metafield()

      expect(spyRequest).toBeCalledTimes(1)
      expect(spyRequest).toBeCalledWith({
        params: { limit: 250 },
        url: 'metafields'
      })
    })

    it('uses request config for shopify resource', async () => {
      const type: ShopifyResourceWithMetafield = 'pages'
      const id = -1

      await Subject.metafield(type, id)

      expect(spyRequest).toBeCalledTimes(1)
      expect(spyRequest).toBeCalledWith({
        params: { limit: 250 },
        url: `${type}/${id}/metafields`
      })
    })
  })

  describe('.metafieldGlobal', () => {
    it('returns object with metafields from `globals` namespace', async () => {
      const spy = jest.spyOn(Subject, 'metafield')

      spy.mockReturnValue(Promise.resolve(METAFIELDS_GLOBAL))

      await Subject.metafieldGlobals()

      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith(null, null, { namespace: 'globals' })

      expect(mockOFA).toBeCalledTimes(1)
      expect(mockOFA).toBeCalledWith(METAFIELDS_GLOBAL, 'key')
    })
  })

  describe('.onRejected', () => {
    it('throws error json object from axios error with status code', () => {
      let ejson = {} as ErrorJSON

      try {
        Subject.onRejected(AXIOS_ERROR)
      } catch (err) {
        ejson = err
      }

      expect(ejson.code).toBe(AXIOS_ERROR.response?.status)
      expect(ejson.data.isAxiosError).toBeTruthy()
      expect(ejson.data.name).not.toBeDefined()
      expect(ejson.data.stack).not.toBeDefined()
      expect(ejson.message).toBe(AXIOS_ERROR.response?.data.errors)
    })
  })

  describe('.pages', () => {
    it('calls .request with correct url and default params.limit', async () => {
      await Subject.pages()

      expect(spyRequest).toBeCalledTimes(1)
      expect(spyRequest).toBeCalledWith({
        params: { limit: 250 },
        url: 'pages'
      })
    })
  })

  describe('.policies', () => {
    it('calls .request with correct url', async () => {
      await Subject.policies()

      expect(spyRequest).toBeCalledTimes(1)
      expect(spyRequest).toBeCalledWith({ url: 'policies' })
    })
  })

  describe('.productListings', () => {
    it('calls .request with correct url and default params.limit', async () => {
      await Subject.productListings()

      expect(spyRequest).toBeCalledTimes(1)
      expect(spyRequest).toBeCalledWith({
        params: { limit: 250 },
        url: 'product_listings'
      })
    })
  })

  describe('.request', () => {
    it('calls axios client', async () => {
      await Subject.request()

      expect(mockRequest).toHaveBeenCalledTimes(1)
    })

    it('calls axios client with shopify baseURL and rate limit', async () => {
      await Subject.request()

      const config = {
        auth: {
          password: process.env.SHOPIFY_PASSWORD,
          username: process.env.SHOPIFY_API_KEY
        },
        baseURL: Subject.BASE_URL,
        method: 'get',
        url: '/undefined.json'
      }

      const limit = true

      expect(mockRequest).toHaveBeenCalledWith(config, limit)
    })

    it('does not call axios client if menus are being requested', async () => {
      await Subject.request({}, true)

      expect(mockRequest).not.toHaveBeenCalled()
    })
  })
})
