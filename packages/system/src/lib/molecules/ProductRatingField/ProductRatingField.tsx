import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { Box, BoxProps } from '@system/lib/atoms/Box'
import { Input } from '@system/lib/atoms/Input'
import { EventHandlers } from '@system/types'
import uniqueId from 'lodash/uniqueId'
import { FC, useCallback } from 'react'
import useNumber from 'react-hanger/array/useNumber'
import type { ProductRatingFieldProps } from './ProductRatingField.props'

/**
 * @file Implementation - ProductRatingField
 * @module lib/molecules/ProductRatingField/impl
 */

/**
 * Allows users to submit a product rating. When a star is clicked, the clicked
 * star and the stars preceding it will be checked. Any stars following the
 * clicked star will be unchecked.
 *
 * Renders a `Box` component with the class `product-rating-field`.
 */
export const ProductRatingField: FC<ProductRatingFieldProps> = props => {
  const {
    handleRating,
    name = ProductRatingField.defaultProps?.name as string,
    rating: initial_rating,
    values = ProductRatingField.defaultProps?.values as number[],
    ...rest
  } = props

  const sanitized = useSanitizedProps<'div', BoxProps>(
    rest,
    'product-rating-field'
  )

  const [rating, { setValue: setRating }] = useNumber(
    initial_rating || values[values.length - 1] || 5
  )

  /**
   * Updates the internal `rating` state and calls `props.handleRating` if
   * the function is defined.
   *
   * @param event - change event from `<input>` element
   */
  const onChangeRating = (event: EventHandlers.Change.Input) => {
    event.preventDefault()

    setRating(JSON.parse(event.target.value))
    if (handleRating) return handleRating(event)
  }

  /* Callback version of `onChangeRating` */
  const onChangeRatingCB = useCallback(onChangeRating, [
    handleRating,
    setRating
  ])

  return (
    <Box {...sanitized} data-rating={rating} role='group'>
      {values.map(value => (
        <Input
          aria-label={`Give a ${value} star rating`}
          className='product-rating-field-checkbox'
          defaultChecked={value <= rating}
          key={uniqueId('product-rating-field-checkbox')}
          name={name}
          onChange={onChangeRatingCB}
          type='checkbox'
          value={value}
        />
      ))}
    </Box>
  )
}

ProductRatingField.displayName = 'ProductRatingField'

ProductRatingField.defaultProps = {
  'aria-label': 'Product rating field',
  name: 'rating',
  values: [1, 2, 3, 4, 5]
}
