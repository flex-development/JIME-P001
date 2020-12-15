import { DATASETS } from '@app-mocks/datamaps'
import firebaseTestApp from '@app-mocks/firebaseTestApp'
import { getMockData, loadMockData } from '@app-mocks/utils'
import { IReview } from '@flex-development/kustomzcore'
import ReviewRepository from './ReviewRepository'

/**
 * @file Unit Tests - ReviewRepository
 * @module subdomains/sales/repositories/ReviewRepository/spec
 */

describe('ReviewRepository', () => {
  const app = firebaseTestApp(true)
  const database = app.database()

  const REPO: ReviewRepository = new ReviewRepository(database)

  const reviews = getMockData<IReview>(DATASETS.reviews.name)

  describe('#findByProductId', () => {
    beforeAll(async () => loadMockData(database, DATASETS.reviews.name))

    it('returns the reviews submitted for req.id', async () => {
      const product_id = reviews[0].product_id

      const expected = reviews.filter(r => r.product_id === product_id)
      const res = await REPO.findByProductId(product_id)

      expect(res.length).toBe(expected.length)
      res.forEach(review => expect(review.product_id).toBe(product_id))
    })
  })
})
