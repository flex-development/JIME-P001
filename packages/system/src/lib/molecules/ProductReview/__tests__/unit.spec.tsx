import { render, screen } from '@testing-library/react'
import { Default } from '../ProductReview.stories'

/**
 * @file Unit Tests - ProductReview
 * @module lib/molecules/ProductReview/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:ProductReview', () => {
  describe('html', () => {
    it('renders with class "product-review"', () => {
      const { container } = render(<Default {...Default.args} />)

      expect(container.firstChild).toHaveClass('product-review')
    })
  })

  describe('props', () => {
    describe('review', () => {
      it('renders review body', () => {
        render(<Default {...Default.args} />)

        const { body } = Default.args.review

        expect(screen.getByText(body)).toHaveClass('product-review-body')
      })

      it('renders review title', () => {
        render(<Default {...Default.args} />)

        const { title } = Default.args.review

        expect(screen.getByText(title)).toHaveClass('product-review-title')
      })
    })
  })
})
