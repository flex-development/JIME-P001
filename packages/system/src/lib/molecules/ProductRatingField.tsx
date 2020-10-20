import { ANYTHING } from '@flex-development/kustomtypez'
import { useMutatedProps } from '@system/hooks'
import { HTMLInputChangeEvent } from '@system/types'
import React, { FC } from 'react'
import useNumber from 'react-hanger/array/useNumber'
import uuid from 'react-uuid'
import { Box, BoxProps } from '../atoms'
import { FormCheck } from './FormCheck'

/**
 * @file Allow users to rate products
 * @module lib/molecules/ProductRatingField
 */

export interface ProductRatingFieldProps extends BoxProps {
  /**
   * Accessible name for assistive technologies.
   */
  'aria-label'?: string

  /**
   * `onChange` handler. Fires when a rating `<input>` element is clicked.
   */
  onChange?(event: HTMLInputChangeEvent): ANYTHING

  /**
   * Name of `<input>` element.
   *
   * @default rating
   */
  name?: string

  /**
   * Initial value to use for the rating state. If omitted, defaults to the last
   * value in the `values` array, or 5 if `values` is an empty array.
   */
  rating?: number

  /**
   * Array of values to use as rating values.
   *
   * @default [1, 2, 3, 4, 5]
   */
  values?: number[]
}

export const ProductRatingFieldDefaultProps = {
  'aria-label': 'Product rating field',
  name: 'rating',
  values: [1, 2, 3, 4, 5]
}

/**
 * Allows users to submit a product rating. When a star (`<input>` element) is
 * clicked, the clicked star and the stars preceding it will be checked. Any
 * stars following the clicked star will be unchecked.
 *
 * Renders a `Box` component with the class `product-rating-field`.
 */
export const ProductRatingField: FC<ProductRatingFieldProps> = (
  props: ProductRatingFieldProps
) => {
  const {
    onChange,
    name = ProductRatingFieldDefaultProps.name,
    rating: initial_rating,
    values = ProductRatingFieldDefaultProps.values,
    ...rest
  } = props

  const mutated = useMutatedProps<typeof rest>(rest, 'product-rating-field')

  const [rating, { setValue: setRating }] = useNumber(
    initial_rating || values[values.length - 1] || 5
  )

  return (
    <Box {...mutated} data-rating={rating} role='group'>
      {values.map(value => (
        <FormCheck
          aria-label='Product rating field input'
          btn='ghost'
          checked={value <= rating}
          className='product-rating-field-check'
          htmlFor={`product-rating-${value}`}
          key={uuid()}
          name={name}
          onChange={(event: HTMLInputChangeEvent) => {
            setRating(JSON.parse(event.target.value))
            if (onChange) return onChange(event)
          }}
          value={value}
        />
      ))}
    </Box>
  )
}

ProductRatingField.defaultProps = ProductRatingFieldDefaultProps
