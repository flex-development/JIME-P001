import { ProductReview } from '@system/lib/molecules/ProductReview'
import REVIEWS from '@system/tests/fixtures/api/reviews'

/**
 * @file Test Fixture - ProductReview component array
 * @module lib/molecules/Carousel/tests/fixtures/product-review-components
 */

export default REVIEWS.map(review => (
  <ProductReview review={review} key={`review-${review.id}`} />
))
