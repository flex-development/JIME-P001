import {
  IProductReviewCreateRequest,
  IProductReviewService
} from '@app/subdomains/sales/interfaces/IProductReviewService'
import ProductReviewService from '@app/subdomains/sales/services/ProductReviewService'
import ProductListingsMock from '@flex-development/kustomzdesign/__mocks__/product-listings.mock.json'
import CustomersMock from '../__mocks__/data/customers.mock.json'

/**
 * @file Unit Tests - ProductReviewService
 * @module tests/services/ProductReviewService
 */

describe('ProductReviewService', () => {
  const ProductReviews: IProductReviewService = new ProductReviewService()

  describe('#create', () => {
    const customer = CustomersMock[0]
    const product = ProductListingsMock[0]

    const new_review: IProductReviewCreateRequest = {
      email: customer.email,
      productId: `${product.product_id}`,
      productSKU: product.variants[0].sku,
      reviewMessage: 'This is a test review message',
      reviewRating: '5',
      reviewRecommendProduct: 'true',
      reviewTitle: 'This is a test review title'
    }

    it('creates a new product review', async () => {
      const res = await ProductReviews.create(new_review)

      expect(res.author).toBe(customer.default_address.name)
      expect(res.email).toBe(new_review.email)
      expect(res.productHandle).toBe(product.handle)
      expect(res.productId).toBe(new_review.productId)
    })

    it('throws an error if req.email does not belong to an existing customer', async () => {
      const req = { ...new_review, email: 'johndoe@email.com' }
      await expect(() => ProductReviews.create(req)).rejects.toThrow()
    })

    it('throws an error if req.productId does not belong to an existing product', async () => {
      const req = { ...new_review, productId: '-1' }
      await expect(() => ProductReviews.create(req)).rejects.toThrow()
    })

    it('throws an error if req.productSKU does not belong to a variant of the product being reviewed', async () => {
      const req = { ...new_review, productSKU: 'BAD_SKU' }
      await expect(() => ProductReviews.create(req)).rejects.toThrow()
    })
  })
})
