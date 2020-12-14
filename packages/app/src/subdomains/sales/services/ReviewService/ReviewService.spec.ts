import CustomersMock from '@app-mocks/data/customers.mock.json'
import firebaseTestApp from '@app-mocks/firebaseTestApp'
import { CreateReviewRequest } from '@flex-development/kustomzcore'
import ProductListingsMock from '@system-mocks/data/product-listings.mock.json'
import { IReviewService } from './IReviewService'
import ReviewService from './ReviewService'

/**
 * @file Unit Tests - ReviewService
 * @module subdomains/sales/services/ReviewService/spec
 */

describe('ReviewService', () => {
  const app = firebaseTestApp(true)
  const ProductReviews: IReviewService = new ReviewService(app.database())

  describe('#create', () => {
    const customer = CustomersMock[0]
    const product = ProductListingsMock[0]

    const new_review: CreateReviewRequest = {
      body: 'This is a test review message',
      email: customer.email,
      product_id: product.product_id,
      product_sku: product.variants[0].sku,
      rating: 5,
      title: 'This is a test review title'
    }

    it('creates a new product review', async () => {
      const res = await ProductReviews.create(new_review)

      expect(res.customer_id).toBe(customer.id)
      expect(res.product_handle).toBe(product.handle)
      expect(res.product_id).toBe(new_review.product_id)
      expect(res.product_sku).toBe(new_review.product_sku)
    })

    it('throws an error if req.email does not belong to an existing customer', async () => {
      const req = { ...new_review, email: 'johndoe@email.com' }
      await expect(() => ProductReviews.create(req)).rejects.toThrow()
    })

    it('throws an error if req.product_id is not the id of an existing product', async () => {
      const req = { ...new_review, product_id: -1 }
      await expect(() => ProductReviews.create(req)).rejects.toThrow()
    })

    it('throws an error if req.product_sku is not the sku of a variant of the product being reviewed', async () => {
      const req = { ...new_review, product_sku: 'BAD_SKU' }
      await expect(() => ProductReviews.create(req)).rejects.toThrow()
    })
  })
})
