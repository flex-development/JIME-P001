import { render } from '@testing-library/react'
import { Default } from './ProductReview.stories'

/**
 * @file Tests - ProductReview
 * @module components/ui/molecules/ProductReview/spec
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
