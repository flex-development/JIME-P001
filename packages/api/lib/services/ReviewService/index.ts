import type {
  APIQuery,
  APIRequestBody,
  JudgeMeReviewCreateDataDTO as ICreateReviewDTO,
  JudgeMeReviewCuratedStatus as ReviewCuratedStatus,
  JudgeMeReviewSource as ReviewSource,
  NumberString,
  OrNever,
  ReviewRating,
  TObject as ObjectType
} from '@flex-development/kustomzcore'
import { EMPTY_SPACE } from '@flex-development/kustomzcore/config/constants'
import {
  JudgeMeReviewCuratedStatus as Curated,
  JudgeMeReviewSource as Source
} from '@flex-development/kustomzcore/types/reviews'
import isBoolean from 'lodash/isBoolean'
import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'
import join from 'lodash/join'
import uniq from 'lodash/uniq'
import { SEARCH_INDEX_SETTINGS } from '../../config/constants'
import JudgeMe from '../../mixins/JudgeMe'
import type { SearchOptions } from '../../types'
import SearchIndexService from '../SearchIndexService'

/**
 * @file Implementation - Review Service
 * @module lib/services/ReviewService
 */

export type TObject = ObjectType.Review

/**
 * Handles interactions with review object resources.
 *
 * @class
 * @extends SearchIndexService
 */
export default class ReviewService extends SearchIndexService<TObject> {
  /**
   * Initializes a new Review service instance.
   */
  constructor() {
    super(SEARCH_INDEX_SETTINGS.reviews.name, 'id', ReviewService.getObjects)
  }

  /**
   * Returns an array of Judge.me Review objects to populate the search index.
   *
   * @async
   * @return {Promise<TObject[]>} Promise containing index objects
   * @throws {ErrorJSON}
   */
  static async getObjects(): OrNever<Promise<TObject[]>> {
    let done = false
    let page = 1
    let objects: TObject[] = []

    // To get all reviews, we must go page by page
    while (!done) {
      const res = await JudgeMe.index({ page })

      // If no reviews in response, all reviews have been fetched
      if (!res.reviews.length) done = true

      // Add new reviews to objects array and increase page number by 1
      objects = objects.concat(res.reviews)
      page++
    }

    // Filter out unpublished reviews
    return objects.filter(review => review.hidden === false)
  }

  /**
   * Creates a new product review.
   *
   * @async
   * @param {APIRequestBody.Review.POST} [data] - Data to create new review
   * @param {string} data.body - Review body; [1,500]
   * @param {string} data.email - Reviewer email
   * @param {NumberString} data.id - ID of product being reviewed
   * @param {string} [data.ip_addr] - Reviewer's ip address
   * @param {ReviewRating} [data.rating] - Review rating; [1,5]
   * @param {string} [data.title] - Review title; [0,100]
   * @return {Promise<ICreateReviewDTO>} Promise containing validated body data
   */
  async create(
    data: APIRequestBody.Review.POST
  ): OrNever<Promise<ICreateReviewDTO>> {
    // Attempt to create review
    const dto = await JudgeMe.create(data)

    // Update reviews index
    this.index.saveObjects(await this.objects()).wait()

    // Return validated review data
    return dto
  }

  /**
   * Converts a `Review` service query object into an Algolia search
   * options object.
   *
   * @see https://www.algolia.com/doc/api-reference/api-parameters/filters/
   *
   * @param {APIQuery.Review.Find} [query] - Query parameters
   * @param {ReviewCuratedStatus} [query.curated] - Filter by curation status
   * @param {boolean} [query.featured] - Filter by featured reviews
   * @param {string} [query.fields] - Comma-separated list of fields to include
   * @param {boolean} [query.hidden] - Filter by hidden / published reviews
   * @param {number} [query.hitsPerPage] - Number of results per page
   * @param {number} [query.id] - Find review by ID
   * @param {string} [query.ip_address] - Filter by reviewer IP address
   * @param {number} [query.length] - Result limit (used only with offset)
   * @param {number} [query.limit] - Number of hits to retrieve
   * @param {string} [query.objectID] - Find resource by search index objectID
   * @param {number} [query.offset] - Offset of the first result to return
   * @param {number} [query.page] - Specify the page to retrieve
   * @param {number} [query.product_id] - Filter by product listing
   * @param {ReviewRating} [query.rating] - Filter by review rating
   * @param {string} [query.reviewer_email] - Filter by reviewer email address
   * @param {number} [query.reviewer_id] - Filter by reviewer ID
   * @param {ReviewSource} [query.source] - Filter by review creation source
   * @param {string} [query.text] - Text to search in index
   * @param {string} [query.userToken] - User identifier
   * @return {SearchOptions} Algolia search options object
   */
  searchOptions(query: APIQuery.Review.Find = {}): SearchOptions {
    const {
      curated,
      featured,
      hidden,
      id = null,
      ip_address,
      product_id = null,
      rating = null,
      reviewer_email,
      reviewer_id = null,
      source,
      ...rest
    } = query

    // Get default search options
    const { attributesToRetrieve = [], ...options } = super.searchOptions(rest)

    // Initialize search filters array
    const filters: string[] = options.filters?.length ? [options.filters] : []

    // Add `curated` filter
    if (curated && Object.values(Curated).includes(curated)) {
      filters.push(`curated:${curated}`)
    }

    // Add `featured` filter
    if (isBoolean(featured)) filters.push(`featured:${featured}`)

    // Add `hidden` filter
    if (isBoolean(hidden)) filters.push(`hidden:${hidden}`)

    // Add review `id` filter
    if (isNumber(JSON.parse(`${id}`))) filters.push(`id = ${id}`)

    // Add `ip_address` filter
    if (isString(ip_address) || ip_address === null) {
      filters.push(`ip_address:${ip_address}`)
    }

    // Add `product_id` filter
    if (isNumber(JSON.parse(`${product_id}`))) {
      filters.push(`product_external_id = ${product_id}`)
    }

    // Add review `rating` filter
    if (isNumber(JSON.parse(`${rating}`))) filters.push(`rating = ${rating}`)

    // Add `reviewer_email` filter
    if (isString(reviewer_email)) {
      filters.push(`reviewer.email:${reviewer_email}`)
    }

    // Add reviewer_id filter
    if (isNumber(JSON.parse(`${reviewer_id}`))) {
      filters.push(`reviewer.id = ${reviewer_id}`)
    }

    // Add `source` filter
    if (source && Object.values(Source).includes(source)) {
      filters.push(`source:${source}`)
    }

    // Add review id to attributes
    const attributes = attributesToRetrieve.concat(['id'])

    return {
      ...options,
      attributesToRetrieve: uniq(attributes),
      filters: join(filters, EMPTY_SPACE)
    }
  }
}
