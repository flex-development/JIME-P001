import MockReviewsRepoRoot from '@app-mocks/data/reviews.mock.json'
import firebaseTestApp from '@app-mocks/firebaseTestApp'
import { loadReviewsTestData } from '@app-mocks/utils'
import { IReview } from '@flex-development/kustomzcore'
import ReviewRepository from './ReviewRepository'

/**
 * @file Unit Tests - ReviewRepository
 * @module subdomains/sales/repositories/ReviewRepository/spec
 */

describe('ReviewRepository', () => {
  const app = firebaseTestApp(true)

  const repo: ReviewRepository = new ReviewRepository(app.database())
  const reviews = Object.values(MockReviewsRepoRoot) as Array<IReview>

  describe('#findByProductId', () => {
    beforeAll(async () => loadReviewsTestData(app))

    it('returns the reviews submitted for req.id', async () => {
      const product_id = reviews[0].product_id

      const expected = reviews.filter(r => r.product_id === product_id)
      const res = await repo.findByProductId(product_id)

      expect(res.length).toBe(expected.length)
      res.forEach(review => expect(review.product_id).toBe(product_id))
    })
  })
})
