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
import { ReviewRating } from '../../types/reviews'

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

const CreateReviewDTO = object({
  body: STRING.max(...constraints.body.max).min(...constraints.body.min),
  email: STRING.email(),
  id: union([NUMBER.positive(), STRING.refine(v => JSON.parse(`${v || -1}`))]),
  ip_addr: optional(STRING),
  rating: optional(nativeEnum(ReviewRating)),
  title: optional(nullable(STRING.max(...constraints.title.max)))
})

export default CreateReviewDTO
