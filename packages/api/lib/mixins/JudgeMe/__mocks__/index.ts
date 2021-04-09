import type JudgeMe from '@kapi/mixins/JudgeMe'
import { REVIEWS } from '@kapi/tests/fixtures/judgeme/reviews'
import CUSTOMERS from '@kapi/tests/fixtures/shopify/customers'
import PRODUCTS from '@kapi/tests/fixtures/shopify/products'
import CRDTO from '@kustomzcore/models/CreateReviewDTO'
import type { ZodIssue } from '@kustomzcore/types/errors'
import type {
  JudgeMeReviewCreateDataDTO as ICreateReviewDTO,
  JudgeMeReviewIndexParamsNoAuth as IndexParams,
  JudgeMeReviewIndexRes as IndexRes
} from '@kustomzcore/types/reviews'
import { ReviewRating } from '@kustomzcore/types/reviews'
import type { AxiosRequestConfig } from 'axios'
import chunk from 'lodash/chunk'
import clamp from 'lodash/clamp'
import isNumber from 'lodash/isNumber'
import { ZodError } from 'zod'
import ErrorHandling from '../../ErrorHandling'
import '../../ShopifyAPI'

/**
 * @file Mock - JudgeMe
 * @module lib/mixins/JudgeMe/mocks
 * @see https://jestjs.io/docs/next/manual-mocks#mocking-user-modules
 */

jest.mock('../../ShopifyAPI')

jest.unmock('@flex-development/kustomzcore/utils/createError')

type RequireActual = { default: typeof JudgeMe }

const { default: Actual } = jest.requireActual<RequireActual>('..')

export default class MockJudgeMe extends Actual {
  static create = jest.fn(async (data: ICreateReviewDTO) => {
    try {
      const parsed = await CRDTO.parseAsync(data)

      const issues: ZodIssue[] = []

      if (!CUSTOMERS.find(customer => customer.email === data.email)) {
        issues.push({
          code: 'custom',
          message: `Customer with email "${data.email}" does not exist`,
          params: { email: data.email },
          path: ['email']
        })
      }

      if (!PRODUCTS.find(product => product.product_id === data.id)) {
        issues.push({
          code: 'custom',
          message: `Product with id "${data.id}" does not exist`,
          params: { id: data.id },
          path: ['id']
        })
      }

      if (issues.length) throw new ZodError(issues)
      return parsed
    } catch (zerror) {
      throw ErrorHandling.formatValidationError(zerror, data)
    }
  })

  static index = jest.fn(async (params: IndexParams) => {
    return MockJudgeMe.request({ params })
  })

  static onRejected = jest.fn(Actual.onRejected)

  static request = jest.fn(async (config: AxiosRequestConfig = {}) => {
    const { data, method = 'get', params } = config
    return method.toUpperCase() === 'POST' ? data : listReviews(params)
  })
}

/**
 * Lists all reviews.
 *
 * @async
 * @param {IndexParams} [params] - Query parameters
 * @param {number} [params.page] - Page number for reviews pagination
 * @param {number} [params.per_page] - Number of reviews per page; [1, 10]
 * @param {number} [params.product_id] - Filter reviews by product ID
 * @param {ReviewRating} [params.rating] - Filter reviews by rating; [1, 5]
 * @param {number} [params.reviewer_id] - Filter reviews by reviewer ID
 * @return {IndexRes} Mock Reviews Index response
 */
const listReviews = (params: IndexParams = {}): IndexRes => {
  const { page = 1, per_page = 10, product_id, rating, reviewer_id } = params

  // Split reviews
  const chunked = chunk(REVIEWS, clamp(per_page, 1, 10))

  // Get page of reviews
  let reviews = chunked[page - 1] || []

  // Handle product_id filter
  if (isNumber(product_id)) {
    reviews = reviews.filter(r => r.product_external_id === product_id)
  }

  // Handle rating filter
  if (rating && Object.values(ReviewRating).includes(rating)) {
    reviews = reviews.filter(r => r.rating === rating)
  }

  // Handle product_id filter
  if (isNumber(reviewer_id)) {
    reviews = reviews.filter(r => r.reviewer.id === reviewer_id)
  }

  return { current_page: page, per_page, reviews }
}
