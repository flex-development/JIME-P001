import { Default } from '@kustomz-stories/molecules/ProductReview.stories'
import { ProductReviewProps } from '@kustomz/lib'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - ProductReview
 * @module tests/lib/molecules/ProductReview
 *
 * @todo Add unit tests for invalid form state and form submission
 */

it('renders <div class="product-review">', () => {
  const args = Default.args as ProductReviewProps

  const { container } = render(<Default {...args} />)

  expect(container.firstChild).toHaveClass('product-review')
})

it('displays a customer name', () => {
  const args = Default.args as ProductReviewProps

  const { getByText } = render(<Default {...args} />)

  expect(getByText(args.name)).toHaveClass('product-review-name')
})

it('displays a customer review', () => {
  const args = Default.args as ProductReviewProps

  const { getByText } = render(<Default {...args} />)

  expect(getByText(args.body)).toHaveClass('product-review-body')
})
