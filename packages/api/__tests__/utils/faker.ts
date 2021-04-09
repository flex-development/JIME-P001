import type { JudgeMeReview } from '@flex-development/kustomzcore/types'
import {
  JudgeMeReviewCuratedStatus as Curated,
  JudgeMeReviewSource as Source,
  JudgeMeReviewVerifiedStatus as Verified
} from '@flex-development/kustomzcore/types'
import CUSTOMERS from '@kapi/tests/fixtures/shopify/customers'
import PRODUCTS from '@kapi/tests/fixtures/shopify/products'
import faker from 'faker'

/**
 * @file Faker Utilities
 * @module utils/faker
 * @see https://github.com/Marak/faker.js
 */

export const CUSTOMER_EMAILS = CUSTOMERS.map(customer => customer.email)
export const PRODUCT_TITLES = PRODUCTS.map(listing => listing.title)
export const RATINGS = [1, 2, 3, 4, 5]

/**
 * Generates a fake Judge.me product review.
 *
 * @return {JudgeMeReview} Fake product review
 */
export const fakeReview = (): JudgeMeReview => {
  const customer = faker.random.arrayElement(CUSTOMERS)
  const product = faker.random.arrayElement(PRODUCTS)

  return {
    body: faker.lorem.sentences(faker.random.arrayElement(RATINGS)),
    created_at: faker.datatype.datetime().toISOString(),
    curated: faker.random.arrayElement(Object.values(Curated)),
    featured: faker.datatype.boolean(),
    hidden: faker.datatype.boolean(),
    id: faker.datatype.number(),
    ip_address: faker.random.arrayElement([faker.internet.ip(), null]),
    pictures: [],
    product_external_id: product.product_id,
    product_handle: product.handle,
    product_title: product.title,
    rating: faker.random.arrayElement(RATINGS),
    reviewer: {
      accepts_marketing: customer.accepts_marketing,
      email: customer.email,
      external_id: null,
      id: customer.id,
      name: customer.default_address.name,
      phone: customer.default_address.phone,
      source_email: customer.email,
      tags: customer.tags?.split(', ') ?? [],
      unsubscribed_at: faker.random.arrayElement([
        faker.datatype.datetime().toISOString(),
        null
      ])
    },
    source: faker.random.arrayElement(Object.values(Source)),
    title: faker.random.arrayElement([faker.lorem.words(4), null]),
    updated_at: faker.datatype.datetime().toISOString(),
    verified: faker.random.arrayElement(Object.values(Verified))
  }
}

/**
 * Generates an array of fake Judge.me product reviews.
 *
 * @param {number} [count] - Number of reviews to generate
 * @return {JudgeMeReview[]} Fake product reviews
 */
export const fakeReviews = (count: number = 10): JudgeMeReview[] => {
  const reviews: JudgeMeReview[] = []

  for (let x = 0; x <= count - 1; x++) {
    reviews.push(fakeReview())
  }

  return reviews
}
