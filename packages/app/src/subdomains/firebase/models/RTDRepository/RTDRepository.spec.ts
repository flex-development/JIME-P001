import { DATASETS } from '@app-mocks/datamaps'
import firebaseTestApp from '@app-mocks/firebaseTestApp'
import { CarEntity, CarModel } from '@app-mocks/models/Car.model.mock'
import { getMockData, loadMockData } from '@app-mocks/utils'
import { FeathersErrorJSON } from '@feathersjs/errors'
import { RTDRepoUpdateBatch } from './IRTDRepository'
import Repo from './RTDRepository'

/**
 * @file Unit Tests - RTDRepository
 * @module subdomains/firebase/models/RTDRepository/spec
 */

describe('RTDRepository', () => {
  const app = firebaseTestApp(true)
  const database = app.database()

  const REPO = new Repo<CarEntity>(DATASETS.cars.name, CarModel, database)

  const cars = getMockData<CarEntity>('cars')
  const IMAGINARY_CAR_ID = 'IMAGINARY_CAR_ID'

  describe('#constructor', () => {
    it('creates a reference to the repository location in the database', () => {
      expect(REPO.path).toBe(DATASETS.cars.path)
    })
  })

  describe('#create', () => {
    beforeAll(async () => database.ref(DATASETS.cars.path).remove())
    afterAll(async () => database.ref(DATASETS.cars.path).remove())

    it('creates a new entity', async () => {
      const req = cars[0]
      const res = await REPO.create(req)

      expect(res.created_at).toBeDefined()
      expect(res).toMatchObject(req)
    })
  })

  describe('#createBatch', () => {
    afterAll(async () => database.ref(DATASETS.cars.path).remove())

    it('returns an array of created entities', async () => {
      const res = await REPO.createBatch(Object.assign([], cars))

      res.forEach(res_car => {
        const expected_car = cars.find(car => car.id === res_car.id)
        expect(res_car).toMatchObject(expected_car as CarEntity)
      })
    })
  })

  describe('#delete', () => {
    beforeAll(async () => loadMockData<CarEntity>(database, 'cars'))
    afterAll(async () => database.ref(DATASETS.cars.path).remove())

    it('removes an entity', async () => {
      const car = cars[4]
      const res = await REPO.delete(car.id)

      expect(res).toBeTruthy()
    })
  })

  describe('#find', () => {
    beforeAll(async () => loadMockData<CarEntity>(database, 'cars'))
    afterAll(async () => database.ref(DATASETS.cars.path).remove())

    it('returns all entities', async () => {
      const res = await REPO.find()

      expect(res.length).toBe(cars.length)
    })
  })

  describe('#findById', () => {
    beforeAll(async () => loadMockData<CarEntity>(database, 'cars'))
    afterAll(async () => database.ref(DATASETS.cars.path).remove())

    it('returns an entity', async () => {
      const car = cars[0]

      expect(await REPO.findById(car.id)).toMatchObject(car)
    })

    it('returns null if the entity is not found', async () => {
      expect(await REPO.findById(IMAGINARY_CAR_ID)).toBe(null)
    })
  })

  describe('#get', () => {
    beforeAll(async () => loadMockData<CarEntity>(database, 'cars'))
    afterAll(async () => database.ref(DATASETS.cars.path).remove())

    it('returns an entity', async () => {
      const car = cars[1]
      const res = await REPO.get(car.id)

      expect(res).toMatchObject(car)
    })

    it('throws an error if the entity does not exist', async () => {
      let res = {} as FeathersErrorJSON

      try {
        await REPO.get(IMAGINARY_CAR_ID)
      } catch (error) {
        res = error
      }

      expect(res.code).toBe(404)
    })
  })

  describe('#update', () => {
    beforeAll(async () => loadMockData<CarEntity>(database, 'cars'))
    afterAll(async () => database.ref(DATASETS.cars.path).remove())

    it('returns an updated entity', async () => {
      const car = cars[4]
      const data = { id: 'cant-update', model: 'car model name' }

      const res = await REPO.update(car.id, data)

      expect(res.id !== data.id).toBeTruthy()
      expect(res.model).toBe(data.model)
    })
  })

  describe('#updateBatch', () => {
    beforeAll(async () => loadMockData<CarEntity>(database, 'cars'))
    afterAll(async () => database.ref(DATASETS.cars.path).remove())

    it('returns an array of updated entities', async () => {
      const data = [
        { ...cars[2], model: 'car model' },
        { ...cars[4], model: 'another car model' }
      ] as RTDRepoUpdateBatch<CarEntity>[]

      const res = await REPO.updateBatch(data)

      res.forEach(res_car => {
        const expected_car = data.find(car => car.id === res_car.id)
        expect(res_car).toMatchObject(expected_car as CarEntity)
      })
    })
  })

  describe('#upsert', () => {
    beforeAll(async () => loadMockData<CarEntity>(database, 'cars'))
    afterAll(async () => database.ref(DATASETS.cars.path).remove())

    it('returns a new entity', async () => {
      const data = { ...cars[4], ...cars[1] }
      const res = await REPO.upsert(IMAGINARY_CAR_ID, data)

      expect(res).toMatchObject({ ...data, id: IMAGINARY_CAR_ID })
    })

    it('returns an updated entity', async () => {
      const data = { ...cars[3], ...cars[1] }
      const res = await REPO.upsert(data.id, data)

      expect(res).toMatchObject(data)
    })
  })

  describe('#upsertBatch', () => {
    beforeAll(async () => loadMockData<CarEntity>(database, 'cars'))
    afterAll(async () => database.ref(DATASETS.cars.path).remove())

    it('returns an array with a new and updated entity', async () => {
      const data = [
        { ...cars[2], id: IMAGINARY_CAR_ID },
        { ...cars[4], ...cars[1] }
      ] as RTDRepoUpdateBatch<CarEntity>[]

      const res = await REPO.upsertBatch(data)

      res.forEach(res_car => {
        const expected_car = data.find(car => car.id === res_car.id)
        expect(res_car).toMatchObject(expected_car as CarEntity)
      })
    })
  })
})
