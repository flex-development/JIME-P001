import { AshTray } from '@kustomz-stories/molecules/ProductReviewForm.stories'
import { ProductReviewFormProps } from '@kustomz/lib'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - ProductReviewForm
 * @module tests/lib/molecules/ProductReviewForm
 */

it('renders <div class="product-review-form">', () => {
  const args = AshTray.args as ProductReviewFormProps

  const { container } = render(<AshTray {...args} />)

  expect(container.firstChild).toHaveClass('product-review-form')
})

it('displays the form title', () => {
  const args = AshTray.args as ProductReviewFormProps

  const { getByText } = render(<AshTray {...args} />)

  expect(getByText('Submit a Product Review')).toBeInTheDocument()
})
