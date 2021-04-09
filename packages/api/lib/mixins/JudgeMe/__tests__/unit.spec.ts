import { request } from '@flex-development/kustomzcore/config/axios'
import type {
  ErrorJSON,
  JudgeMeReviewCreateDataDTO as ICreateReviewDTO
} from '@flex-development/kustomzcore/types'
import CUSTOMERS from '@kapi/tests/fixtures/shopify/customers'
import PRODUCT from '@kapi/tests/fixtures/shopify/products/ash-tray'
import Subject from '..'
import AXIOS_ERROR from './__fixtures__/axios-error'

/**
 * @file Unit Tests - Judge.me Mixin
 * @module lib/mixins/JudgeMe/tests/unit
 */

jest.mock('../../ShopifyAPI')
jest.unmock('@flex-development/kustomzcore/utils/createError')

const mockRequest = request as jest.MockedFunction<typeof request>
const spyRequest = jest.spyOn(Subject, 'request')

describe('unit:lib/mixins/JudgeMe', () => {
  describe('.create', () => {
    const customer = CUSTOMERS[0]

    const body = '👍🏾'
    const email = customer.email
    const id = PRODUCT.product_id

    const DATA = { body, email, id }

    it('calls .request', async () => {
      await Subject.create(DATA)

      const args = spyRequest.mock.calls[0][0]

      expect(spyRequest).toBeCalledTimes(1)
      expect(args?.data).toMatchObject(DATA)
      expect(args?.method).toBe('post')
    })

    it('strips unknown properties', async () => {
      await Subject.create({ ...DATA, foo: '' } as ICreateReviewDTO)

      expect(spyRequest.mock.calls[0][0]?.data).toMatchObject(DATA)
    })
  })

  describe('.index', () => {
    it('calls .request', async () => {
      await Subject.index()

      expect(spyRequest).toBeCalledTimes(1)
    })

    describe('formats params.per_page', () => {
      describe('number', () => {
        it('in range', async () => {
          const per_page = 2

          await Subject.index({ per_page })

          expect(spyRequest.mock.calls[0][0]?.params.per_page).toBe(per_page)
        })

        it('out of range', async () => {
          const per_page = -24

          await Subject.index({ per_page })

          expect(spyRequest.mock.calls[0][0]?.params.per_page).toBe(1)
        })
      })

      describe('string', () => {
        it('in range', async () => {
          const per_page = ('8' as unknown) as number
          const eper_page = JSON.parse(`${per_page}`)

          await Subject.index({ per_page })

          expect(spyRequest.mock.calls[0][0]?.params.per_page).toBe(eper_page)
        })

        it('out of range', async () => {
          const per_page = ('13' as unknown) as number

          await Subject.index({ per_page })

          expect(spyRequest.mock.calls[0][0]?.params.per_page).toBe(10)
        })
      })
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
      expect(ejson.message).toBe(AXIOS_ERROR.response?.data.error)
    })
  })

  describe('.request', () => {
    it('calls axios client', async () => {
      await Subject.request()

      expect(mockRequest).toHaveBeenCalledTimes(1)
    })

    describe('calls axios client with judge.me baseURL', () => {
      const econfig = {
        baseURL: Subject.BASE_URL,
        headers: { 'Content-Type': 'application/json' },
        url: '/'
      }

      it('GET: with auth query parameters', async () => {
        await Subject.request()

        expect(mockRequest).toHaveBeenCalledWith({
          ...econfig,
          data: {},
          method: 'GET',
          params: {
            api_token: Subject.API_TOKEN,
            shop_domain: Subject.SHOP_DOMAIN
          }
        })
      })

      it('POST: with data.platform and data.url', async () => {
        await Subject.request({ method: 'post' })

        expect(mockRequest).toHaveBeenCalledWith({
          ...econfig,
          data: { platform: 'shopify', url: Subject.SHOP_DOMAIN },
          method: 'POST',
          params: {}
        })
      })
    })
  })
})
