import { fireEvent, render, screen } from '@testing-library/react'
import { ProductRatingField } from './ProductRatingField'
import { Default } from './ProductRatingField.stories'

/**
 * @file Tests - ProductRatingField
 * @module lib/molecules/ProductRatingField/spec
 */

describe('ProductRatingField', () => {
  const { defaultProps } = ProductRatingField
  const DEFAULT_PROPS_VALUES = defaultProps?.values as number[]

  it('renders with class "product-rating-field"', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild).toHaveClass('product-rating-field')
  })

  it('renders with inner fields', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild?.childNodes.length).toBe(
      DEFAULT_PROPS_VALUES.length
    )
  })

  it('updates the product rating state', () => {
    const { container } = render(<Default {...Default.args} />)

    const i_rating = DEFAULT_PROPS_VALUES[DEFAULT_PROPS_VALUES.length - 1]
    const rating = DEFAULT_PROPS_VALUES[2]

    // Expect default rating to be last value in `values` array
    expect(container.firstChild).toHaveAttribute('data-rating', `${i_rating}`)

    // Click `<input class='btn-check' type='checkbox'>`
    fireEvent.click(screen.getByDisplayValue(`${rating}`))

    // Get `<input checked='' type='checkbox'>` elements
    const checked: number[] = []

    DEFAULT_PROPS_VALUES.map((value: number) => {
      if (value <= rating) checked.push(value)
    })

    // Expect checked elements to match new rating
    expect(checked.length).toBe(rating)
    expect(container.firstChild).toHaveAttribute('data-rating', `${rating}`)
  })

  it('calls props.handleRating when clicked', () => {
    const handleRating = jest.fn()

    render(<Default {...Default.args} handleRating={handleRating} />)

    // Click `<input class='btn-check' type='checkbox'>
    fireEvent.click(screen.getByDisplayValue(`${DEFAULT_PROPS_VALUES[2]}`))

    // Expect `handleRating` fn to have been called once
    expect(handleRating).toHaveBeenCalledTimes(1)
  })
})
