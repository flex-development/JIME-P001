import { Default } from '@kustomz-stories/molecules/ProductReview.stories'
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

it('displays a customer name', () => {
  const { getByText } = render(<Default {...Default.args} />)

  expect(getByText(Default.args.name)).toHaveClass('product-review-name')
})

it('displays a customer review', () => {
  const { getByText } = render(<Default {...Default.args} />)

  expect(getByText(Default.args.body)).toHaveClass('product-review-body')
})
