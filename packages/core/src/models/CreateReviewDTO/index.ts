import type { ANYTHING } from '@flex-development/json'
import type { ZodString } from 'zod'
import {
  nativeEnum,
  nullable,
  number,
  object,
  optional,
  string,
  union
} from 'zod'
import { request } from '../../config/axios'
import type {
  APIPayload,
  CustomErrorParams,
  ICustomer,
  ICustomerResFind,
  NumberString
} from '../../types'
import { ReviewRating } from '../../types'

/**
 * @file Implementation - CreateReviewDTO
 * @module models/CreateReviewDTO
 * @see https://github.com/colinhacks/zod/tree/v3.0.0-alpha.33
 */

const NUMBER = number()
const STRING = string()

/**
 * Generates a character limit error message.
 *
 * @param {number} limit - Limit value
 * @param {'max' | 'min'} type - Type of character limit
 * @return {string} Character limit error message
 */
const charlimit = (limit: number, type: 'max' | 'min' = 'max'): string => {
  const charstring = `character${limit === 1 ? '' : 's'}`

  if (type === 'max') return `Must be ${limit} ${charstring} or fewer`
  return `Must be at least ${limit} ${charstring}`
}

/**
 * Constraint settings for different `CreateReviewDTOZ` properties.
 */
const constraints = {
  body: {
    max: [5000, { message: charlimit(5000) }],
    min: [1, { message: charlimit(1, 'min') }]
  } as Record<string, Parameters<ZodString['max']>>,
  title: {
    max: [100, { message: charlimit(100) }]
  } as Record<'max', Parameters<ZodString['max']>>
}

/**
 * Returns an email error object.
 *
 * @param {ANYTHING} output - Email validation output
 * @return {CustomErrorParams} Email error parameters
 */
const EmailError = (output: ANYTHING): CustomErrorParams => ({
  message: `Customer with email "${output}" does not exist`,
  params: { email: output }
})

/**
 * Returns a product ID error object.
 *
 * @param {ANYTHING} output - Product ID validation output
 * @return {CustomErrorParams} Product ID error parameters
 */
const ProductError = (output: ANYTHING): CustomErrorParams => ({
  message: `Product with id "${output}" does not exist`,
  params: { id: output }
})

/**
 * Checks if {@param email} belongs to an existing customer.
 *
 * @async
 * @param {string} email - Email to validate
 * @return {Promise<boolean>} Promise containing `true` if customer email
 */
const refineEmail = async (email: ICustomer['email']): Promise<boolean> => {
  // Request customers from Shopify API
  const { customers } = await request<ICustomerResFind>({
    auth: {
      password: process.env.SHOPIFY_PASSWORD || '',
      username: process.env.SHOPIFY_API_KEY || ''
    },
    baseURL: `https://${process.env.SHOPIFY_DOMAIN}`,
    method: 'GET',
    url: '/customers.json'
  })

  return !!customers.find(customer => customer.email === email)
}

/**
 * Checks if {@param id} is a product ID.
 *
 * @async
 * @param {NumberString} id - Email to validate
 * @return {Promise<boolean>} Promise containing `true` product ID
 */
const refineID = async (id: NumberString): Promise<boolean> => {
  // Request product listings from KAPI
  const products = await request<APIPayload.Product[]>({
    baseURL: 'https://kapi.flexdevelopment.vercel.app',
    method: 'GET',
    url: '/products'
  })

  // Parse ID
  const $id = typeof id === 'string' ? JSON.parse(id) : id

  return !!products.find(product => product.product_id === $id)
}

const CreateReviewDTO = object({
  body: STRING.max(...constraints.body.max).min(...constraints.body.min),
  email: STRING.email().refine(refineEmail, EmailError),
  id: union([NUMBER.positive(), STRING]).refine(refineID, ProductError),
  ip_addr: optional(STRING),
  rating: optional(nativeEnum(ReviewRating)),
  title: optional(nullable(STRING.max(...constraints.title.max)))
})

export default CreateReviewDTO
