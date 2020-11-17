import { ProductRatingField } from '@system/components'
import { Default } from '@system/stories/lib/molecules/ProductRatingField.stories'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - ProductRatingField
 * @module tests/lib/molecules/ProductRatingField
 */

const { defaultProps } = ProductRatingField

const DEFAULT_PROPS_VALUES = defaultProps?.values as number[]

it('renders without crashing', () => {
  const { container } = render(<Default {...Default.args} />)

  // Expect `<div class='product-rating-field'>`
  expect(container.firstChild).toHaveClass('product-rating-field')

  DEFAULT_PROPS_VALUES.map((value: number) => {
    const checkbox = screen.getByDisplayValue(`${value}`)

    // Expect `<input class='btn-check' type='checkbox'>
    expect(checkbox).toHaveClass('btn-check')
    expect(checkbox).toHaveAttribute('type', 'checkbox')

    // Expect <div class='product-rating-field-check'>
    expect(checkbox.parentNode).toHaveClass('product-rating-field-check')
  })
})

it('updates the product rating state', () => {
  const { container } = render(<Default {...Default.args} />)

  const init_rating = DEFAULT_PROPS_VALUES[DEFAULT_PROPS_VALUES.length - 1]
  const rating = DEFAULT_PROPS_VALUES[2]

  // Expect default rating to be last value in `values` array
  expect(container.firstChild).toHaveAttribute('data-rating', `${init_rating}`)

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

it('calls props.onChange when clicked', () => {
  const onChange = jest.fn()

  render(<Default {...Default.args} onChange={onChange} />)

  // Click `<input class='btn-check' type='checkbox'>
  fireEvent.click(screen.getByDisplayValue(`${DEFAULT_PROPS_VALUES[2]}`))

  // Expect `onChange` fn to have been called once
  expect(onChange).toHaveBeenCalledTimes(1)
})
