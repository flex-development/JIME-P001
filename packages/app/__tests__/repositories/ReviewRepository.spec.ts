import { ReviewRepository } from '@app/subdomains/sales/repositories'
import { IReview } from '@flex-development/types'
import MockReviewsRepoRoot from '../__mocks__/data/reviews.mock.json'
import firebaseTestApp from '../__mocks__/firebaseTestApp'
import { loadReviewsTestData } from '../__mocks__/utils'

/**
 * @file Unit Tests - ReviewRepository
 * @module tests/repositories/ReviewRepository
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
