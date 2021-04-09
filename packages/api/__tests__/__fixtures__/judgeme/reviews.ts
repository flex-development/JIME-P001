import type { JudgeMeReview } from '@flex-development/kustomzcore/types'
import {
  JudgeMeReviewCuratedStatus as Curated,
  JudgeMeReviewSource as Source,
  JudgeMeReviewVerifiedStatus as Verified
} from '@flex-development/kustomzcore/types'
import { fakeReviews } from '@kapi/tests/utils/faker'

/**
 * @file Global Test Fixture - Judge.me Product Reviews
 * @module tests/fixtures/judgeme/reviews
 */

export const NUM_FAKE_REVIEWS = 19
export const PER_PAGE = 10

// ! Need at least one stable review object. Faker data always changes
export const OBJECT: JudgeMeReview = Object.freeze({
  body: 'Tenetur est voluptatum impedit iure et magni quam',
  created_at: '2092-09-07T21:08:25.296Z',
  curated: Curated.CURATED,
  featured: false,
  // ! Only published reviews allowed in search index
  hidden: false,
  id: 29216,
  ip_address: null,
  pictures: [],
  product_external_id: 6147082092699,
  product_handle: 'ash-tray',
  product_title: 'Ash Tray',
  rating: 5,
  reviewer: {
    accepts_marketing: false,
    email: 'egnition_sample_20@egnition.com',
    external_id: null,
    id: 4259526541467,
    name: 'Conan Anderson',
    phone: '+37061234567',
    source_email: 'egnition_sample_20@egnition.com',
    tags: ['egnition-sample-data', 'VIP'],
    unsubscribed_at: null
  },
  source: Source.IMPORTED,
  title: null,
  updated_at: '2065-10-13T04:04:08.107Z',
  verified: Verified.NOTHING
})

export const REVIEWS = [OBJECT, ...fakeReviews(NUM_FAKE_REVIEWS)]
export const OBJECTS = REVIEWS.filter(r => r.hidden === false)

export const NUM_FAKE_REQUESTS = REVIEWS.length / PER_PAGE + 1
