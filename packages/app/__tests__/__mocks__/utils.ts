import MockCarsRepoRoot from './data/cars.mock.json'
import { CarEntity } from './models/Car.model.mock'

/**
 * @file Test Utilities
 * @module tests/mocks/utils
 */

export const CARS: Partial<CarEntity>[] = Object.values(MockCarsRepoRoot)

/**
 * Expects each object in {@param res} to match {@param expected}.
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
