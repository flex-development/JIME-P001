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
  body:
    'Church-key glossier sint intelligentsia tumblr, pour-over paleo kogi tousled excepteur magna banh mi af. Blue bottle pickled gluten-free, waistcoat adaptogen cupidatat veniam man braid edison bulb eiusmod 8-bit retro. Wayfarers meditation pork belly keffiyeh, raw denim lumbersexual direct trade glossier hammock fam. Veniam man braid edison bulb eiusmod 8-bit retro. Raw denim lumbersexual direct trade glossier hammock fam, blue bottle pickled gluten-free. Stet clita ka gubergren, no sea takimata.',
  created_at: '2021-04-04T01:47:57+00:00',
  curated: Curated.CURATED,
  featured: false,
  // ! Only published reviews allowed in search index
  hidden: false,
  id: 190656479,
  ip_address: null,
  pictures: [],
  product_external_id: 6147082092699,
  product_handle: 'ash-tray',
  product_title: 'Ash Tray',
  rating: 4,
  reviewer: {
    accepts_marketing: false,
    email: 'egnition_sample_12@egnition.com',
    external_id: 693875703881,
    id: 29224904,
    name: 'Len Stark',
    phone: '+18094545832',
    source_email: 'egnition_sample_12@egnition.com',
    tags: ['egnition-sample-data'],
    unsubscribed_at: null
  },
  source: Source.WEB,
  title:
    'Lorem ipsum dolor sit amet, consetetur elitr, sed diam eirmod tempor labore et dolore magna aliquyam',
  updated_at: '2021-04-04T01:50:04+00:00',
  verified: Verified.NOTHING
})

export const REVIEWS = [OBJECT, ...fakeReviews(NUM_FAKE_REVIEWS)]
export const OBJECTS = REVIEWS.filter(r => r.hidden === false)

export const NUM_FAKE_REQUESTS = REVIEWS.length / PER_PAGE + 1
