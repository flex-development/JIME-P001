import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { Box, BoxProps } from '@system/lib/atoms/Box'
import { Input } from '@system/lib/atoms/Input'
import { EventHandlers } from '@system/types'
import uniqueId from 'lodash/uniqueId'
import { FC, useCallback } from 'react'
import useNumber from 'react-hanger/array/useNumber'
import type { ProductRatingProps } from './ProductRating.props'

/**
 * @file Implementation - ProductRating
 * @module lib/molecules/ProductRating/impl
 */

/**
 * Allows users to submit a product rating. When a star is clicked, the clicked
 * star and the stars preceding it will be checked. Any stars following the
 * clicked star will be unchecked.
 *
 * Renders a `Box` component with the class `product-rating`.
 */
export const ProductRating: FC<ProductRatingProps> = props => {
  const {
    handleRating,
    name = ProductRating.defaultProps?.name as string,
    rating: initial_rating,
    values = ProductRating.defaultProps?.values as number[],
    ...rest
  } = props

  const sanitized = useSanitizedProps<'div', BoxProps>(rest, 'product-rating')

  const [rating, { setValue: setRating }] = useNumber(
    initial_rating || values[values.length - 1] || 5
  )

  /**
   * Updates the internal `rating` state and calls `props.handleRating` if
   * the function is defined.
   *
   * @param {EventHandlers.Change.Input} event - change event
   * @return {void}
   */
  const onChangeRating = (event: EventHandlers.Change.Input): void => {
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
          aria-checked={value <= rating}
          aria-label={`Give a ${value} star rating`}
          className='product-rating-checkbox'
          defaultChecked={value <= rating}
          key={uniqueId('product-rating-checkbox')}
          name={name}
          onChange={onChangeRatingCB}
          type='checkbox'
          value={value}
        />
      ))}
    </Box>
  )
}

ProductRating.displayName = 'ProductRating'

ProductRating.defaultProps = {
  'aria-label': 'Product rating field',
  name: 'rating',
  values: [1, 2, 3, 4, 5]
}
