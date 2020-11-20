import { Default } from '@system/stories/lib/molecules/ProductReview.stories'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - ProductReview
 * @module tests/lib/molecules/ProductReview
 */

it('renders without crashing', () => {
  const { container } = render(<Default {...Default.args} />)

  expect(container.firstChild).toHaveClass('product-review')
})

it('displays the product review title', () => {
  const { getByText } = render(<Default {...Default.args} />)
  const { title } = Default.args.review

  expect(getByText(title)).toHaveClass('product-review-title')
})

it('displays the product review body', () => {
  const { getByText } = render(<Default {...Default.args} />)
  const { body } = Default.args.review

  expect(getByText(body)).toHaveClass('product-review-body')
})