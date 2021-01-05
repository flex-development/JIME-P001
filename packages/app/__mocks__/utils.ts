import { AnyObject } from '@flex-development/json'
import { ICheckout } from '@flex-development/kustomzcore'
import { FirebaseAdaptorDatabase } from '@subdomains/firebase'
import { DATASETS } from './datamaps'

/**
 * @file Test Utilities
 * @module mocks/utils
 */

/**
 * Returns the data array from one of the mock datasets.
 *
 * ! Mock data entities will not have a `created_at` property`.
 *
 * @param key - Key of mock dataset
 * @return Array of mock data
 */
export function getMockData<T = AnyObject>(key: keyof typeof DATASETS): T[] {
  // Return array of mock entities
  return Object.values(Object.assign({}, DATASETS[key].data || {})) as Array<T>
}

/**
 * Loads the data array from one of the mock datasets into the database.
 *
 * @async
 * @param app - Firebase test application
 * @param key - Key of mock dataset
 * @return Array of mock data
 */
export async function loadMockData<T = AnyObject>(
  database: FirebaseAdaptorDatabase,
  key: keyof typeof DATASETS
): Promise<T[]> {
  // Get dataset
  const { path } = DATASETS[key] || {}

  // Add timestamps to data
  const data = getMockData<T>(key)

  // Set data
  await database.ref(path).set(data)

  // Return array of mock entities
  return data
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
 * @param res - Data array response
 * @param expected - Expected data array
 * @param length - If true, compare length
 */
export function matchTestObjects<T = AnyObject>(
  res: Array<T | Partial<T>>,
  expected: Array<Partial<T>>,
  length?: boolean
): void {
  if (length) expect(res.length).toBe(expected.length)
  res.forEach((result, i: number) => expect(result).toMatchObject(expected[i]))
}
