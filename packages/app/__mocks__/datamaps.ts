import { AnyObject } from '@flex-development/json'
import MockCarsRepoRoot from './data/cars.mock.json'
import MockMenusRepoRoot from './data/menus.mock.json'
import MockPagesRepoRoot from './data/pages.mock.json'
import MockReviewsRepoRoot from './data/reviews.mock.json'

/**
 * @file Mock Datamaps
 * @module mocks/datamaps
 */

export type MockDataMap = {
  data: AnyObject
  name: string
  path: string
}

export type MockDataMapObject = Record<string, MockDataMap>

export const DATASETS: MockDataMapObject = {
  cars: {
    data: { ...MockCarsRepoRoot },
    name: 'cars',
    path: `${process.env.NODE_ENV}/cars`
  },
  menus: {
    data: { ...MockMenusRepoRoot },
    name: 'menus',
    path: `${process.env.NODE_ENV}/menus`
  },
  pages: {
    data: { ...MockPagesRepoRoot },
    name: 'pages',
    path: `${process.env.NODE_ENV}/pages`
  },
  reviews: {
    data: { ...MockReviewsRepoRoot },
    name: 'reviews',
    path: `${process.env.NODE_ENV}/reviews`
  }
}
