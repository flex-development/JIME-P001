import type { APIQuery, ErrorJSON } from '@flex-development/kustomzcore/types'
import {
  ErrorClassName,
  ErrorStatusCode
} from '@flex-development/kustomzcore/types'
import Subject from '..'
import ALGOLIA from '../../../config/algolia'
import {
  Car,
  CARS_INDEX_NAME as indexName,
  CARS_OIDK as oidk,
  CAR_OBJECTS,
  getCarObjects as getObjects
} from './__fixtures__/cars'

/**
 * @file Unit Tests - SearchIndexService
 * @module lib/services/SearchIndexService/tests/unit
 */

jest.mock('../../../config/algolia')
jest.unmock('@flex-development/kustomzcore/utils/createError')

const mockAlgolia = ALGOLIA as jest.Mocked<typeof ALGOLIA>

describe('unit:lib/services/SearchIndexService', () => {
  const { ENV } = Subject

  describe('constructor', () => {
    it('initializes search index', () => {
      new Subject<Car>(indexName, oidk, getObjects)

      expect(mockAlgolia.initIndex).toBeCalledTimes(1)
      expect(mockAlgolia.initIndex).toBeCalledWith(`${ENV}_${indexName}`)
    })

    it('sets oidk property', () => {
      expect(new Subject<Car>(indexName, oidk, getObjects).oidk).toBe(oidk)
    })

    it('sets search index settings', () => {
      const service = new Subject<Car>(indexName, oidk, getObjects)

      // @ts-expect-error testing invocation
      const spy = jest.spyOn(service.index, 'setSettings')

      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith({})
    })

    it('clears index', () => {
      const service = new Subject<Car>(indexName, oidk, getObjects, true)

      // @ts-expect-error testing invocation
      expect(jest.spyOn(service.index, 'clearObjects')).toBeCalledTimes(1)
    })
  })

  describe('#find', () => {
    const service = new Subject<Car>(indexName, oidk, getObjects, true)

    it('converts query into search options object', async () => {
      const spy = jest.spyOn(service, 'searchOptions')

      await service.find()

      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith({})
    })

    it('executes search', async () => {
      const spy = jest.spyOn(service, 'search')

      await service.find()

      expect(spy).toBeCalledTimes(1)
    })
  })

  describe('#findOne', () => {
    const service = new Subject<Car>(indexName, oidk, getObjects, true)

    const query: APIQuery.SearchIndexObject = { objectID: CAR_OBJECTS[0][oidk] }

    it('calls #get', async () => {
      const spy = jest.spyOn(service, 'get')

      await service.findOne(query)

      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith(query.objectID, undefined)
    })
  })

  describe('#get', () => {
    const service = new Subject<Car>(indexName, oidk, getObjects, true)

    const car = CAR_OBJECTS[CAR_OBJECTS.length - 1]

    const objectID = car[oidk] as string
    const options = { filters: `objectID:${objectID}` }

    const spy = {
      search: jest.spyOn(service, 'search'),
      searchOptions: jest.spyOn(service, 'searchOptions')
    }

    beforeEach(() => {
      spy.search.mockClear()
      spy.searchOptions.mockClear()
    })

    it('returns search index object', async () => {
      const cars_filtered = CAR_OBJECTS.filter(c => c[oidk] === objectID)

      spy.searchOptions.mockReturnValue(options)
      spy.search.mockReturnValue(Promise.resolve(cars_filtered))

      expect(await service.get(car.vin)).toMatchObject(car)
    })

    it('throws 404 error if search index object does not exist', async () => {
      spy.searchOptions.mockReturnValueOnce(options)
      spy.search.mockReturnValueOnce(Promise.resolve([]))

      let error = {} as ErrorJSON

      try {
        await service.get(objectID)
      } catch (err) {
        error = err
      }

      const { className, errors, code, data, message } = error

      expect(className).toBe(ErrorClassName.NotFound)
      expect(code).toBe(ErrorStatusCode.NotFound)
      expect(data).toMatchObject({ fields: undefined })
      expect(errors).toMatchObject({ objectID })
      expect(message).toMatch(new RegExp(`objectID "${objectID}" not found`))
    })
  })

  describe('#objects', () => {
    it('calls #getObjects', async () => {
      await new Subject<Car>(indexName, oidk, getObjects).objects()

      expect(getObjects).toBeCalledTimes(1)
    })

    it('adds objectID property to each object using current oidk', async () => {
      const objs = await new Subject<Car>(indexName, oidk, getObjects).objects()

      objs.forEach(obj => expect(obj.objectID).toBe(obj[oidk]))
    })

    it('handles error if this.getObjects throws', async () => {
      const getObjects = jest.fn()
      const service = new Subject<Car>(indexName, oidk, getObjects)

      let error = {} as ErrorJSON

      getObjects.mockRejectedValueOnce(new Error('Test'))

      try {
        await service.objects()
      } catch (err) {
        error = err
      }

      expect(error.className).toBe(ErrorClassName.GeneralError)
      expect(error.code).toBe(ErrorStatusCode.GeneralError)

      // @ts-expect-error testing
      expect(error.data).toMatchObject({ index_name: service.index_name, oidk })
    })
  })

  describe('#search', () => {
    const service = new Subject<Car>(indexName, oidk, getObjects)

    beforeEach(async () => {
      await service.search()
    })

    it('calls #index.saveObjects with #getObjects return value', () => {
      // @ts-expect-error testing invocation
      const spy = jest.spyOn(service.index, 'saveObjects')

      expect(spy).toBeCalledTimes(1)

      spy.mock.calls[0][0].forEach((callobj, i) => {
        expect(callobj).toMatchObject(getObjects()[i])
      })
    })

    it('calls #index.search', () => {
      // @ts-expect-error testing invocation
      expect(jest.spyOn(service.index, 'search')).toBeCalledTimes(1)
    })
  })

  describe('#searchOptions', () => {
    const service = new Subject<Car>(indexName, oidk, getObjects)

    it('formats query.fields', () => {
      const fields = `${oidk},foo`

      const options = service.searchOptions({ fields })

      expect(options.attributesToRetrieve).toStrictEqual(fields.split(','))
    })

    it('formats query.limit', () => {
      const limit = 2

      const options = service.searchOptions({ limit })

      expect(options.length).toBe(limit)
      expect(options.offset).toBe(0)
    })

    it('formats query.objectID', () => {
      const objectID = CAR_OBJECTS[0][oidk] as string

      const options = service.searchOptions({ objectID })

      expect(options.filters).toBe(`objectID:${objectID}`)
    })
  })
})
