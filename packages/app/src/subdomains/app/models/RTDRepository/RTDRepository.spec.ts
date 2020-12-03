import MockCarsRepoRoot from '@app-mocks/data/cars.mock.json'
import firebaseTestApp from '@app-mocks/firebaseTestApp'
import { CarEntity, CarModel } from '@app-mocks/models/Car.model.mock'
import {
  CAR_REPO_TEST_PATH,
  loadCarsTestData,
  matchTestCarObjects,
  removeCarsTestData
} from '@app-mocks/utils'
import { AnyObject, NullishPrimitive, SortOrder } from '@flex-development/json'
import { get, gt, gte, isEqual, lt, lte, orderBy } from 'lodash'
import { RTDRepoUpdateEntityBatch } from './IRTDRepository'
import Repo from './RTDRepository'

/**
 * @file Unit Tests - RTDRepository
 * @module subdomains/app/models/RTDRepository/spec
 */

describe('RTDRepository', () => {
  const IMAGINARY_CAR_ID = 'IMAGINARY_CAR_ID'

  const app = firebaseTestApp(true)
  const cars: Partial<CarEntity>[] = Object.values(MockCarsRepoRoot)

  let CarRepo: Repo<CarEntity> | AnyObject = {}
  let REPO = CarRepo as Repo<CarEntity>

  beforeAll(() => {
    REPO = new Repo<CarEntity>(CAR_REPO_TEST_PATH, CarModel, app.database())
    CarRepo = REPO
  })

  describe('#constructor', () => {
    it('creates a reference to the repository location in the database', () => {
      expect(CarRepo?.path).toBe(CAR_REPO_TEST_PATH)
      expect(CarRepo?.root.key).toBe(CAR_REPO_TEST_PATH)
    })
  })

  describe('#create', () => {
    beforeAll(async () => removeCarsTestData(app))
    afterAll(async () => removeCarsTestData(app))

    it('creates a new entity', async () => {
      const req = cars[0]
      const res = await REPO.create(req)

      expect(res?.created_at).toBeDefined()
      expect(res).toMatchObject(req)
    })
  })

  describe('#createBatch', () => {
    afterAll(async () => removeCarsTestData(app))

    it('returns an array of created entities', async () => {
      const res = await REPO.createBatch(Object.assign([], cars))

      matchTestCarObjects(res, cars, true)
      matchTestCarObjects(res, await REPO.find(), true)
      expect(true).toBe(true)
    })
  })

  describe('#delete', () => {
    beforeAll(async () => loadCarsTestData(app))
    afterAll(async () => removeCarsTestData(app))

    it('removes an entity', async () => {
      const car = cars[5] as CarEntity

      await REPO.delete(car.id)

      expect(await REPO.findById(car.id)).toBe(null)
    })
  })

  describe('#find', () => {
    beforeAll(async () => loadCarsTestData(app))
    afterAll(async () => removeCarsTestData(app))

    it('returns all entities', async () => {
      expect((await REPO.find()).length).toBe(cars.length)
    })

    it('handles $eq query', async () => {
      const field = 'owner.first_name'
      const $eq = cars[0][field]

      const equal = (car: CarEntity | Partial<CarEntity>) => {
        return isEqual(car[field], $eq)
      }

      const expected = cars.filter(car => equal(car))
      const result = await REPO.find({ [field]: { $eq } })

      expect(result.length).toBe(expected.length)
      result.forEach(res => expect(equal(res)).toBeTruthy())
    })

    it('handles $gt query', async () => {
      const field = 'model_year'
      const $gt = cars[4][field] as number

      const greaterThan = (car: CarEntity | Partial<CarEntity>) => {
        return gt(car[field], $gt)
      }

      const expected = cars.filter(car => greaterThan(car))
      const result = await REPO.find({ [field]: { $gt } })

      expect(result.length).toBe(expected.length)
      result.forEach(res => expect(greaterThan(res)).toBeTruthy())
    })

    it('handles $gte query', async () => {
      const field = 'model_year'
      const $gte = cars[3][field] as number

      const greaterThanEq = (car: CarEntity | Partial<CarEntity>) => {
        return gte(car[field], $gte)
      }

      const expected = cars.filter(car => greaterThanEq(car))
      const result = await REPO.find({ [field]: { $gte } })

      expect(result.length).toBe(expected.length)
      result.forEach(res => expect(greaterThanEq(res)).toBeTruthy())
    })

    it('handles $in query with primtive values', async () => {
      const field = 'make'
      const $in = [cars[0][field], cars[4][field]] as NullishPrimitive[]

      const isIncluded = (car: CarEntity | Partial<CarEntity>) => {
        return $in.includes(car[field] as NullishPrimitive)
      }

      const expected = cars.filter(car => isIncluded(car))
      const result = await REPO.find({ [field]: { $in } })

      expect(result.length).toBe(expected.length)
      result.forEach(res => expect(isIncluded(res)).toBeTruthy())
    })

    it('handles $in query with primitive array', async () => {
      const field = 'drivers'
      const $in = [(cars as Array<CarEntity>)[0].drivers[0]]

      const isIncluded = (car: CarEntity | Partial<CarEntity>) => {
        return car[field]?.some(v => $in.includes(v))
      }

      const expected = cars.filter(car => isIncluded(car))
      const result = await REPO.find({ [field]: { $in } })

      expect(result.length).toBe(expected.length)
      result.forEach(res => expect(isIncluded(res)).toBeTruthy())
    })

    it('handles $limit query', async () => {
      const $limit = 3

      const result = await REPO.find({ $limit })

      expect(result.length).toBe($limit)
    })

    it('handles $lt query', async () => {
      const field = 'vin'
      const $lt = cars[7][field] as string

      const lessThan = (car: CarEntity | Partial<CarEntity>) => {
        return lt(car[field], $lt)
      }

      const expected = cars.filter(car => lessThan(car))
      const result = await REPO.find({ [field]: { $lt } })

      expect(result.length).toBe(expected.length)
      result.forEach(res => expect(lessThan(res)).toBeTruthy())
    })

    it('handles $lte query', async () => {
      const field = 'vin'
      const $lte = cars[1][field] as string

      const lessThanEq = (car: CarEntity | Partial<CarEntity>) => {
        return lte(car[field], $lte)
      }

      const expected = cars.filter(car => lessThanEq(car))
      const result = await REPO.find({ [field]: { $lte } })

      expect(result.length).toBe(expected.length)
      result.forEach(res => expect(lessThanEq(res)).toBeTruthy())
    })

    it('handles $ne query', async () => {
      const field = 'model_year'
      const $ne = cars[2][field]

      const notEqual = (car: CarEntity | Partial<CarEntity>) => {
        return !isEqual(car[field], $ne)
      }

      const expected = cars.filter(car => notEqual(car))
      const res = await REPO.find({ [field]: { $ne } })

      expect(res.length).toBe(expected.length)
      res.forEach(res => expect(notEqual(res)).toBeTruthy())
    })

    it('handles $nin query with primtive values', async () => {
      const field = 'owner.last_name'
      const $nin = [cars[0][field], cars[4][field]] as NullishPrimitive[]

      const notIncluded = (car: CarEntity | Partial<CarEntity>) => {
        return !$nin.includes(get(car, field))
      }

      const expected = cars.filter(car => notIncluded(car))
      const result = await REPO.find({ [field]: { $nin } })

      expect(result.length).toBe(expected.length)
      result.forEach(res => expect(notIncluded(res)).toBeTruthy())
    })

    it('handles $nin query with primitive array', async () => {
      const field = 'drivers'
      const $nin = cars[3].drivers as CarEntity['drivers']

      const notIncluded = (car: CarEntity | Partial<CarEntity>) => {
        return car[field]?.every(v => !$nin.includes(v))
      }

      const expected = cars.filter(car => notIncluded(car))
      const result = await REPO.find({ [field]: { $nin } })

      expect(result.length).toBe(expected.length)
      result.forEach(res => expect(notIncluded(res)).toBeTruthy())
    })

    it('handles $select query', async () => {
      const $select: (keyof CarEntity)[] = ['vin']
      const result = await REPO.find({ $select })

      result.forEach(res => {
        expect(Object.keys(res)).toEqual(expect.arrayContaining($select))
      })
    })

    it('handles $skip query', async () => {
      const $skip = 5

      const res = await REPO.find({ $skip })

      expect(res.length).toBe(cars.length - $skip)
    })

    it('handles $sort query', async () => {
      const $sort = { 'owner.last_name': SortOrder.ASCENDING }

      const expected = orderBy(cars, Object.keys($sort), Object.values($sort))
      const res = await REPO.find({ $sort })

      matchTestCarObjects(res, expected)
      expect(true).toBe(true)
    })
  })

  describe('#findById', () => {
    beforeAll(async () => loadCarsTestData(app))
    afterAll(async () => removeCarsTestData(app))

    it('returns an entity', async () => {
      const car = cars[8] as CarEntity

      expect(await REPO.findById(car.id)).toMatchObject(car)
    })

    it('returns null if the entity is not found', async () => {
      expect(await REPO.findById(IMAGINARY_CAR_ID)).toBe(null)
    })
  })

  describe('#get', () => {
    beforeAll(async () => loadCarsTestData(app))
    afterAll(async () => removeCarsTestData(app))

    it('returns an entity', async () => {
      const car = cars[1] as CarEntity

      expect(await REPO.get(car.id)).toMatchObject(car)
    })

    it('throws an error if the entity does not exist', async () => {
      await expect(() => REPO.get(IMAGINARY_CAR_ID)).rejects.toThrow()
    })
  })

  describe('#update', () => {
    beforeAll(async () => loadCarsTestData(app))
    afterAll(async () => removeCarsTestData(app))

    it('returns an updated entity', async () => {
      const car = cars[5] as CarEntity
      const data = { id: 'cant-update', model: 'car model name' }

      const result = await REPO.update(car.id, data)

      expect(result.id !== data.id).toBeTruthy()
      expect(result).toMatchObject({ ...car, ...data, id: car.id })
    })
  })

  describe('#updateBatch', () => {
    beforeAll(async () => loadCarsTestData(app))
    afterAll(async () => removeCarsTestData(app))

    it('returns an array of updated entities', async () => {
      const data = [
        { ...cars[7], model: 'car model' },
        { ...cars[5], model: 'another car model' }
      ] as RTDRepoUpdateEntityBatch<CarEntity>[]

      const result = await REPO.updateBatch(data)

      matchTestCarObjects(result, data, true)
      expect(true).toBe(true)
    })
  })

  describe('#upsert', () => {
    beforeAll(async () => loadCarsTestData(app))
    afterAll(async () => removeCarsTestData(app))

    it('returns a new entity', async () => {
      const data = { ...cars[5], ...cars[1] }
      const expected = { ...data, id: IMAGINARY_CAR_ID }

      expect(await REPO.upsert(IMAGINARY_CAR_ID, data)).toMatchObject(expected)
    })

    it('returns an updated entity', async () => {
      const data = { ...cars[3], ...cars[1] } as CarEntity

      const result = await REPO.upsert(data.id, data)

      expect(result).toMatchObject(data)
    })
  })

  describe('#upsertBatch', () => {
    beforeAll(async () => loadCarsTestData(app))
    afterAll(async () => removeCarsTestData(app))

    it('returns an array with a new and updated entity', async () => {
      const data = [
        { ...cars[7], id: IMAGINARY_CAR_ID },
        { ...cars[5], ...cars[1] }
      ] as RTDRepoUpdateEntityBatch<CarEntity>[]

      const result = await REPO.upsertBatch(data)

      matchTestCarObjects(result, data, true)
      expect(true).toBe(true)
    })
  })
})
