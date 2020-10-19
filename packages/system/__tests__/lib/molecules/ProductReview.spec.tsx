import { Default } from '@system/stories/lib/molecules/ProductReview.stories'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - ProductReview
 * @module tests/lib/molecules/ProductReview
 *
 * @todo Add unit tests for invalid form state and form submission
 */

it('renders <div class="product-review">', () => {
  const { container } = render(<Default {...Default.args} />)

  expect(container.firstChild).toHaveClass('product-review')
})

it('displays the product review title', () => {
  const { getByText } = render(<Default {...Default.args} />)

  expect(getByText(Default.args.title)).toHaveClass('product-review-title')
})

it('displays the product review body', () => {
  const { getByText } = render(<Default {...Default.args} />)

  expect(getByText(Default.args.body)).toHaveClass('product-review-body')
})
