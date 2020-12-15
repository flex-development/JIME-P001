import { AnyObject } from '@flex-development/json'
import MockCarsRepoRoot from './data/cars.mock.json'
import MockMenusRepoRoot from './data/menus.mock.json'
import MockPagesRepoRoot from './data/pages.mock.json'
import MockReviewsRepoRoot from './data/reviews.mock.json'

/**
 * @file Mock Datamaps
 * @module mocks/datamaps
 */

export type MockDataMap<P extends string = string> = {
  data: AnyObject
  path: P
}

export type MockDataMapObject = Record<string, MockDataMap>

export const DATASET_CARS: MockDataMap<'cars'> = {
  data: { ...MockCarsRepoRoot },
  path: 'cars'
}

export const DATASET_MENUS: MockDataMap<'menus'> = {
  data: { ...MockMenusRepoRoot },
  path: 'menus'
}

export const DATASET_PAGES: MockDataMap<'pages'> = {
  data: { ...MockPagesRepoRoot },
  path: 'pages'
}
export const DATASET_REVIEWS: MockDataMap<'reviews'> = {
  data: { ...MockReviewsRepoRoot },
  path: 'reviews'
}

export const DATASETS: MockDataMapObject = {
  cars: DATASET_CARS,
  menus: DATASET_MENUS,
  pages: DATASET_PAGES,
  reviews: DATASET_REVIEWS
}
