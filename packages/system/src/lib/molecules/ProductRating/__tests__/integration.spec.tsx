import { render, screen } from '@testing-library/react'
import User from '@testing-library/user-event'
import { ProductRating } from '../ProductRating'
import { Default } from '../ProductRating.stories'

/**
 * @file Integration Tests - ProductRating
 * @module lib/molecules/ProductRating/tests/integration
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('integration:ProductRating', () => {
  const VALUES = ProductRating.defaultProps?.values as number[]

  describe('simulate user', () => {
    it('update product rating', () => {
      const { container } = render(<Default {...Default.args} />)

      const rating = VALUES[2]

      // ! Simulate user clicking new rating
      User.click(screen.getByDisplayValue(`${rating}`))

      // Expect new product rating to be reflected
      expect(container.firstChild).toHaveAttribute('data-rating', `${rating}`)
    })
  })
})
