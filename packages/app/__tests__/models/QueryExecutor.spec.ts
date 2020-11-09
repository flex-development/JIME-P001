import { QueryExecutor, SortOrder } from '@app/subdomains/app'
import { get, gt, gte, isEqual, lt, lte, orderBy } from 'lodash'
import MockCarsRepoRoot from '../__mocks__/data/cars.mock.json'
import { CarEntity } from '../__mocks__/models/Car.model.mock'
import { matchTestCarObjects } from '../__mocks__/utils'

/**
 * @file Unit Tests - QueryExecutor
 * @module tests/models/QueryExecutor
 */

describe('QueryExecutor', () => {
  const CarQueryExecutor = new QueryExecutor<CarEntity>()
  const data: Array<CarEntity> = Object.values(MockCarsRepoRoot)

  describe('#$eq', () => {
    it('matches values that are equal to a specified value', () => {
      const field = 'model'
      const $eq = data[0][field]

      const equal = (car: CarEntity | Partial<CarEntity>) => {
        return isEqual(car[field], $eq)
      }

      const expected = data.filter(car => equal(car))
      const result = CarQueryExecutor.$eq(data, field, $eq)

      expect(result.length).toBe(expected.length)
      result.forEach(res => expect(equal(res)).toBeTruthy())
    })
  })

  describe('#$gt', () => {
    it('matches values that are > a specified value', () => {
      const field = 'model_year'
      const $gt = data[3][field]

      const greaterThan = (car: CarEntity | Partial<CarEntity>) => {
        return gt(car[field], $gt)
      }

      const expected = data.filter(car => greaterThan(car))
      const result = CarQueryExecutor.$gt(data, field, $gt)

      expect(result.length).toBe(expected.length)
      result.forEach(res => expect(greaterThan(res)).toBeTruthy())
    })
  })

  describe('#$gte', () => {
    it('matches values that are >= a specified value', () => {
      const field = 'model_year'
      const $gte = data[2][field]

      const greaterThanEq = (car: CarEntity | Partial<CarEntity>) => {
        return gte(car[field], $gte)
      }

      const expected = data.filter(car => greaterThanEq(car))
      const result = CarQueryExecutor.$gte(data, field, $gte)

      expect(result.length).toBe(expected.length)
      result.forEach(res => expect(greaterThanEq(res)).toBeTruthy())
    })
  })

  describe('#$in', () => {
    it('matches any primitive values specified', () => {
      const field = 'make'
      const $in = [data[0].make, data[4].make]

      const isIncluded = (car: CarEntity | Partial<CarEntity>) => {
        return $in.includes(car[field] as string)
      }

      const expected = data.filter(car => isIncluded(car))
      const result = CarQueryExecutor.$in(data, field, $in)

      expect(result.length).toBe(expected.length)
      result.forEach(res => expect(isIncluded(res as CarEntity)).toBeTruthy())
    })

    it('matches primitive[] that contain any of the values specified', () => {
      const field = 'drivers'
      const $in = [data[0].drivers[0]]

      const isIncluded = (car: CarEntity | Partial<CarEntity>) => {
        return car[field]?.some(v => $in.includes(v))
      }

      const expected = data.filter(car => isIncluded(car))
      const result = CarQueryExecutor.$in(data, field, $in)

      expect(result.length).toBe(expected.length)
      result.forEach(res => expect(isIncluded(res as CarEntity)).toBeTruthy())
    })
  })

  describe('#$limit', () => {
    it('returns a subset of entities', () => {
      const $limit = 7

      expect(CarQueryExecutor.$limit(data, $limit).length).toBe($limit)
    })
  })

  describe('#$lt', () => {
    it('matches values that are < a specified value', () => {
      const field = 'vin'
      const $lt = data[1][field]

      const lessThan = (car: CarEntity | Partial<CarEntity>) => {
        return lt(car[field], $lt)
      }

      const expected = data.filter(car => lessThan(car))
      const result = CarQueryExecutor.$lt(data, field, $lt)

      expect(result.length).toBe(expected.length)
      result.forEach(res => expect(lessThan(res)).toBeTruthy())
    })
  })

  describe('#$lte', () => {
    it('matches values that are <= a specified value', () => {
      const field = 'vin'
      const $lte = data[7][field]

      const lessThanEq = (car: CarEntity | Partial<CarEntity>) => {
        return lte(car[field], $lte)
      }

      const expected = data.filter(car => lessThanEq(car))
      const result = CarQueryExecutor.$lte(data, field, $lte)

      expect(result.length).toBe(expected.length)
      result.forEach(res => expect(lessThanEq(res)).toBeTruthy())
    })
  })

  describe('#$ne', () => {
    it('matches values that are not equal to a specified value', () => {
      const field = 'drivers'
      const $ne = data[0][field]

      const notEqual = (car: CarEntity | Partial<CarEntity>) => {
        return !isEqual(car[field], $ne)
      }

      const expected = data.filter(car => notEqual(car))
      const result = CarQueryExecutor.$ne(data, field, $ne)

      expect(result.length).toBe(expected.length)
      result.forEach(res => expect(notEqual(res)).toBeTruthy())
    })
  })

  describe('#$nin', () => {
    it('matches none of the primitive values specified', () => {
      const field = 'owner.first_name'
      const $nin = [data[0].owner.first_name, data[1].owner.first_name]

      const notIncluded = (car: CarEntity | Partial<CarEntity>) => {
        return !$nin.includes(get(car, field))
      }

      const expected = data.filter(car => notIncluded(car))
      const result = CarQueryExecutor.$nin(data, field, $nin)

      expect(result.length).toBe(expected.length)
      result.forEach(res => expect(notIncluded(res as CarEntity)).toBeTruthy())
    })

    it('matches primitive[] that do not contain any values specified', () => {
      const field = 'drivers'
      const $nin = data[2].drivers

      const notIncluded = (car: CarEntity | Partial<CarEntity>) => {
        return car[field]?.every(v => !$nin.includes(v))
      }

      const expected = data.filter(car => notIncluded(car))
      const result = CarQueryExecutor.$nin(data, field, $nin)

      expect(result.length).toBe(expected.length)
      result.forEach(res => expect(notIncluded(res as CarEntity)).toBeTruthy())
    })
  })

  describe('#$select', () => {
    it('picks which fields to include in results', () => {
      const $select: (keyof CarEntity)[] = ['vin']

      const result = CarQueryExecutor.$select(data, $select)

      result.forEach(res => {
        expect(Object.keys(res)).toEqual(expect.arrayContaining($select))
      })
    })
  })

  describe('#$skip', () => {
    it('offsets the number of results in the array', () => {
      const $skip = 3

      const result = CarQueryExecutor.$skip(data, $skip)

      expect(result.length).toBe(data.length - $skip)
    })
  })

  describe('#$sort', () => {
    it('returns an array sorted in ascending order', () => {
      const $sort = { model_year: SortOrder.ASCENDING }

      const expected = orderBy(data, Object.keys($sort), Object.values($sort))
      const result = CarQueryExecutor.$sort(data, $sort)

      matchTestCarObjects(result, expected)
      expect(true).toBe(true)
    })

    it('returns an array sorted in desceding order', () => {
      const $sort = { model_year: SortOrder.DESCENDING }

      const expected = orderBy(data, Object.keys($sort), Object.values($sort))
      const result = CarQueryExecutor.$sort(data, $sort)

      matchTestCarObjects(result, expected)
      expect(true).toBe(true)
    })
  })
})
