import { fireEvent, render, screen } from '@testing-library/react'
import { ProductRating } from '../ProductRating'
import type { ProductRatingProps as Props } from '../ProductRating.props'
import { Default } from '../ProductRating.stories'

/**
 * @file Unit Tests - ProductRating
 * @module lib/molecules/ProductRating/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:ProductRating', () => {
  const { values = [] } = ProductRating.defaultProps as Props

  describe('html', () => {
    it('renders with class "product-rating"', () => {
      const { container } = render(<Default {...Default.args} />)

      expect(container.firstChild).toHaveClass('product-rating')
    })

    it('renders with attribute `data-rating`', () => {
      const { container } = render(<Default {...Default.args} />)

      const rating = values[values.length - 1]

      // Expect default rating to be last value in `values` array
      expect(container.firstChild).toHaveAttribute('data-rating', `${rating}`)
    })

    it('renders inner <input> elements', () => {
      const { container } = render(<Default {...Default.args} />)

      expect(container.firstChild?.childNodes.length).toBe(values.length)
    })
  })

  describe('callbacks', () => {
    it('calls handleRating', () => {
      const handleRating = jest.fn()

      render(<Default {...Default.args} handleRating={handleRating} />)

      // ! Mock user clicking <input> element
      fireEvent.click(screen.getByDisplayValue(`${values[2]}`))

      // Expect `handleRating` fn to have been called once
      expect(handleRating).toHaveBeenCalledTimes(1)
    })
  })
})
