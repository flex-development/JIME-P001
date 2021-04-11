import { OBJECTS as REVIEWS } from '@kapi/tests/fixtures/judgeme/reviews'
import { ProductReview } from '@system/lib/molecules/ProductReview'

/**
 * @file Test Fixture - ProductReview component array
 * @module lib/molecules/Carousel/tests/fixtures/product-review-components
 */

export default REVIEWS.map(review => (
  <ProductReview review={review} key={`review-${review.id}`} />
))
