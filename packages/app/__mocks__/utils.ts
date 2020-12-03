import { FirebaseAdaptor, RTDRepository as Repo } from '@app/subdomains/app'
import { ICMSMenu, ICMSPage } from '@app/subdomains/cms/models'
import { IReview } from '@flex-development/kustomzcore'
import { ICheckout } from 'shopify-api-node'
import MockCarsRepoRoot from './data/cars.mock.json'
import MockMenusRepoRoot from './data/menus.mock.json'
import MockPagesRepoRoot from './data/pages.mock.json'
import MockReviewsRepoRoot from './data/reviews.mock.json'
import { CarEntity } from './models/Car.model.mock'

/**
 * @file Test Utilities
 * @module mocks/utils
 */

export const CAR_REPO_TEST_PATH = 'cars'
export const MENUS_REPO_TEST_PATH = 'menus'
export const PAGES_REPO_TEST_PATH = 'pages'
export const REVIEWS_REPO_TEST_PATH = 'reviews'

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
 * Returns mock pages data.
 */
export const getMockPagesData = (): Array<ICMSPage> => {
  // Dataset is missing timestamps
  const dataset = { ...MockPagesRepoRoot }

  // Add timestamps to mock data
  Object.keys(dataset).forEach(key => {
    dataset[key] = { ...dataset[key], created_at: Repo.timestamp() }
  })

  // Return array of mock pages
  return Object.values((dataset as unknown) as Record<string, ICMSPage>)
}

/**
 * Returns mock menus data.
 */
export const getMockMenusData = (): Array<ICMSMenu> => {
  // Dataset is missing timestamps
  const dataset = { ...MockMenusRepoRoot }

  // Add timestamps to mock data
  Object.keys(dataset).forEach(key => {
    dataset[key] = { ...dataset[key], created_at: Repo.timestamp() }
  })

  // Return array of mock menus
  return Object.values((dataset as unknown) as Record<string, ICMSMenu>)
}

/**
 * Returns mock product reviews data.
 */
export const getMockReviewsData = (): Array<IReview> => {
  const dataset = { ...MockReviewsRepoRoot }

  // Return array of mock product reviews
  return Object.values((dataset as unknown) as Record<string, IReview>)
}

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
 * Loads the mock pages data into the database.
 *
 * @async
 * @param app - Firebase test application
 */
export const loadPagesTestData = async (
  app: FirebaseAdaptor
): Promise<Array<ICMSPage>> => {
  // Dataset is missing timestamps
  const dataset = { ...MockPagesRepoRoot }

  // Add timestamps to mock data
  Object.keys(dataset).forEach(key => {
    dataset[key] = { ...dataset[key], created_at: Repo.timestamp() }
  })

  // Set data
  await app.database().ref(PAGES_REPO_TEST_PATH).set(dataset)

  // Return array of mock pages
  return Object.values((dataset as unknown) as Record<string, ICMSPage>)
}

/**
 * Loads the mock menus data into the database.
 *
 * @async
 * @param app - Firebase test application
 */
export const loadMenusTestData = async (
  app: FirebaseAdaptor
): Promise<Array<ICMSMenu>> => {
  // Dataset is missing timestamps
  const dataset = { ...MockMenusRepoRoot }

  // Add timestamps to mock data
  Object.keys(dataset).forEach(key => {
    dataset[key] = { ...dataset[key], created_at: Repo.timestamp() }
  })

  // Set data
  await app.database().ref(MENUS_REPO_TEST_PATH).set(dataset)

  // Return array of mock menus
  return Object.values((dataset as unknown) as Record<string, ICMSMenu>)
}

/**
 * Loads the mock product reviews data into the database.
 *
 * @async
 * @param app - Firebase test application
 */
export const loadReviewsTestData = async (
  app: FirebaseAdaptor
): Promise<Array<IReview>> => {
  const dataset = { ...MockReviewsRepoRoot }

  // Set data
  await app.database().ref(REVIEWS_REPO_TEST_PATH).set(dataset)

  // Return array of mock product reviews
  return Object.values((dataset as unknown) as Record<string, IReview>)
}

/**
 * Expects in each line item in {@param res.line_items} to have the same
 * `properties`, `quantity`, and `variant_id` as the line items in
 * {@param expected.line_items}.
 *
 * @param res - Checkout
 * @param expected - Expected checkout
 * @param token - If true, match tokens
 */
export const matchLineItems = (
  res: ICheckout,
  expected: ICheckout,
  token = false
): void => {
  if (token) expect(res.token).toBe(expected.token)

  // Expect line properties, quantity, and variant_id to match
  res.line_items.map(({ properties, quantity, variant_id }, i) => {
    expect(properties).toBe(expected.line_items[i].properties)
    expect(quantity).toBe(expected.line_items[i].quantity)
    expect(variant_id).toBe(expected.line_items[i].variant_id)
  })
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
  expected: Array<Partial<CarEntity>>,
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

/**
 * Removes the mock pages data from the database.
 *
 * @async
 * @param app - Firebase test application
 */
export const removePagesTestData = async (
  app: FirebaseAdaptor
): Promise<void> => {
  await app.database().ref(PAGES_REPO_TEST_PATH).remove()
}

/**
 * Removes the mock menus data from the database.
 *
 * @async
 * @param app - Firebase test application
 */
export const removeMenusTestData = async (
  app: FirebaseAdaptor
): Promise<void> => {
  await app.database().ref(MENUS_REPO_TEST_PATH).remove()
}

/**
 * Removes the mock product reviews data from the database.
 *
 * @async
 * @param app - Firebase test application
 */
export const removeReviewsTestData = async (
  app: FirebaseAdaptor
): Promise<void> => {
  await app.database().ref(REVIEWS_REPO_TEST_PATH).remove()
}
