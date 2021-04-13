import type { AnyObject } from '@flex-development/json'
import type { ErrorJSON } from '@flex-development/kustomzcore/types/errors'
import {
  ErrorClassName,
  ErrorStatusCode
} from '@flex-development/kustomzcore/types/errors'
import OBJECTS from '@kapi/tests/fixtures/shopify/customers'
import faker from 'faker'
import Subject from '..'
import '../../../config/algolia'
import { SEARCH_INDEX_SETTINGS } from '../../../config/constants'
import MockShopifyAPI from '../../../mixins/ShopifyAPI'
import MockSearchIndexService from '../../SearchIndexService'

/**
 * @file Unit Tests - CustomerService
 * @module lib/services/CustomerService/tests/unit
 */

jest.mock('../../../config/algolia')
jest.mock('../../../mixins/ShopifyAPI')
jest.mock('../../SearchIndexService')

jest.unmock('@flex-development/kustomzcore/utils/createError')

describe('unit:lib/services/CustomerService', () => {
  const object = OBJECTS[0]
  const objectID = object.id

  describe('constructor', () => {
    it('calls SearchIndexService class constructor', () => {
      new Subject()

      const { constructor } = MockSearchIndexService.prototype
      const { name } = SEARCH_INDEX_SETTINGS.customers

      expect(constructor).toBeCalledTimes(1)
      expect(constructor).toBeCalledWith(name, 'id', Subject.getObjects)
    })
  })

  describe('.getObjects', () => {
    it('sources data from shopify api', async () => {
      await Subject.getObjects()

      expect(MockShopifyAPI.customers).toBeCalledTimes(1)
    })
  })

  describe('#search', () => {
    const service = new Subject()

    const spy = jest.spyOn(MockSearchIndexService.prototype, 'search')

    const query = ''

    it('performs search', async () => {
      const options = { userToken: process.env.SHOPIFY_API_KEY || '' }

      await service.search(query, options)

      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith(query, options)
    })

    it('throws 401 error if options.userToken is invalid', async () => {
      const options = { userToken: '' }
      let ejson = {} as ErrorJSON

      try {
        await service.search(query, options)
      } catch (error) {
        ejson = error
      }

      expect(spy).toBeCalledTimes(0)

      expect(ejson.className).toBe(ErrorClassName.NotAuthenticated)
      expect(ejson.code).toBe(ErrorStatusCode.NotAuthenticated)
      expect(ejson.data).toMatchObject({ options, query })
      expect(ejson.errors as AnyObject).toMatchObject(options)
    })
  })

  describe('#searchOptions', () => {
    const service = new Subject()

    const spy = jest.spyOn(MockSearchIndexService.prototype, 'searchOptions')

    beforeEach(() => {
      spy.mockReturnValue({})
    })

    it('formats query.accepts_marketing', () => {
      const query = { accepts_marketing: object.accepts_marketing }
      const efilter = `accepts_marketing:${query.accepts_marketing}`

      const options = service.searchOptions(query)

      expect(options.filters).toBe(efilter)
    })

    it('formats query.email', () => {
      const query = { email: object.email }

      const options = service.searchOptions(query)

      expect(options.filters).toBe(`email:${query.email}`)
    })

    it('formats query.first_name', () => {
      const query = { first_name: object.first_name }

      const options = service.searchOptions(query)

      expect(options.filters).toBe(`first_name:"${query.first_name}"`)
    })

    it('formats query.id', () => {
      const query = { id: objectID }

      const options = service.searchOptions(query)

      expect(options.filters).toBe(`id = ${query.id}`)
    })

    it('formats query.last_name', () => {
      const query = { last_name: object.last_name }

      const options = service.searchOptions(query)

      expect(options.filters).toBe(`last_name:"${query.last_name}"`)
    })

    it('formats query.last_order_id', () => {
      const query = { last_order_id: faker.datatype.number(13) }

      const options = service.searchOptions(query)

      expect(options.filters).toBe(`last_order_id = ${query.last_order_id}`)
    })

    it('formats query.last_order_name', () => {
      const query = { last_order_name: object.last_order_name }

      const options = service.searchOptions(query)

      expect(options.filters).toBe(`last_order_name:"${query.last_order_name}"`)
    })

    it('formats query.moil', () => {
      const query = { moil: object.marketing_opt_in_level }
      const efilter = `marketing_opt_in_level:${query.moil}`

      const options = service.searchOptions(query)

      expect(options.filters).toBe(efilter)
    })

    it('formats query.orders_count', () => {
      const query = { orders_count: object.orders_count }

      const options = service.searchOptions(query)

      expect(options.filters).toBe(`orders_count = ${query.orders_count}`)
    })

    it('formats query.phone', () => {
      const query = { phone: object.phone }

      const options = service.searchOptions(query)

      expect(options.filters).toBe(`phone:${query.phone}`)
    })

    it('formats query.state', () => {
      const query = { state: object.state }

      const options = service.searchOptions(query)

      expect(options.filters).toBe(`state:${query.state}`)
    })

    it('formats query.total_spent', () => {
      const query = { total_spent: object.total_spent }

      const options = service.searchOptions(query)

      expect(options.filters).toBe(`total_spent:${query.total_spent}`)
    })

    it('formats query.verified_email', () => {
      const query = { verified_email: object.verified_email }

      const options = service.searchOptions(query)

      expect(options.filters).toBe(`verified_email:${query.verified_email}`)
    })

    it('pushes `email` into options.attributesToRetrieve', () => {
      expect(service.searchOptions({}).attributesToRetrieve).toContain('email')
    })

    it('pushes `id` into options.attributesToRetrieve', () => {
      expect(service.searchOptions({}).attributesToRetrieve).toContain('id')
    })
  })
})
