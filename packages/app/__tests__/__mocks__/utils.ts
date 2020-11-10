import { FirebaseAdaptor, RTDRepository as Repo } from '@app/subdomains/app'
import MockCarsRepoRoot from './data/cars.mock.json'
import { CarEntity } from './models/Car.model.mock'

/**
 * @file Test Utilities
 * @module tests/mocks/utils
 */

export const CAR_REPO_TEST_PATH = 'cars'
export const CARS: Partial<CarEntity>[] = Object.values(MockCarsRepoRoot)

/**
 * Loads the mock cars data into the database.
 *
 * @async
 * @param app - Firebase test application
 */
export const loadCarsTestData = async (
  app: FirebaseAdaptor
): Promise<Array<CarEntity>> => {
  // Dataset is missing timestamps
  const dataset: Record<string, Partial<CarEntity>> = { ...MockCarsRepoRoot }

  // Add timestamps to mock data
  Object.keys(dataset).forEach(key => {
    dataset[key] = { ...dataset[key], created_at: Repo.timestamp() }
  })

  // Set data
  await app.database().ref(CAR_REPO_TEST_PATH).set(dataset)

  // Return array of mock cars
  return Object.values(dataset as Record<string, CarEntity>)
}

/**
 * Returns mock cars data.
 */
export const getCarsTestData = (): Array<CarEntity> => {
  // Dataset is missing timestamps
  const dataset: Record<string, Partial<CarEntity>> = { ...MockCarsRepoRoot }

  // Add timestamps to mock data
  Object.keys(dataset).forEach(key => {
    dataset[key] = { ...dataset[key], created_at: Repo.timestamp() }
  })

  // Return array of mock cars
  return Object.values(dataset as Record<string, CarEntity>)
}

/**
 * Expects each entity in {@param res} to match {@param expected}.
 *
 * @param res - Result from `find` method
 * @param expected - Expected car array
 * @param length - If true, compare length
 */
export const matchTestCarObjects = (
  res: Array<CarEntity | Partial<CarEntity>>,
  expected: typeof CARS,
  length?: boolean
): void => {
  if (length) expect(res.length).toBe(expected.length)
  res.forEach((result, i: number) => expect(result).toMatchObject(expected[i]))
}

/**
 * Removes the mock cars data from the database.
 *
 * @async
 * @param app - Firebase test application
 */
export const removeCarsTestData = async (
  app: FirebaseAdaptor
): Promise<void> => {
  await app.database().ref(CAR_REPO_TEST_PATH).remove()
}
