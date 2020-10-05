import { AshTray } from '@kustomz-stories/molecules/ProductReviewForm.stories'
import { ProductReviewFormProps } from '@kustomz/lib'
import { render, screen } from '@testing-library/react'
import User from '@testing-library/user-event'
import React from 'react'

/**
 * @file Tests - ProductReviewForm
 * @module tests/lib/molecules/ProductReviewForm
 */

// ! Keep in sync with Input implementation
const EMAIL_INPUT_PLACEHOLDER = 'you@email.com'

// ! Keep in sync with ProductReviewForm implementation
const SELECT_PLACEHOLDER = 'Select the product variant you purchased'
const TEXTAREA_PLACEHOLDER =
  'Blue bottle single-origin coffee next level taxidermy four loko seitan cupidatat flannel. Cred asymmetrical literally vexillologist cliche do distillery hashtag raw denim crucifix everyday carry affogato austin. Williamsburg jean shorts raclette, aesthetic quinoa dolore hammock echo park taxidermy messenger bag.'
const TITLE_INPUT_PLACEHOLDER = 'A smoke worthy product'

it('renders <div class="product-review-form"> with a disabled submit button', () => {
  const args = AshTray.args as ProductReviewFormProps

  const { container, getByText } = render(<AshTray {...args} />)

  expect(container.firstChild).toHaveClass('product-review-form')
  expect(getByText('Submit Review')).toBeDisabled()
})

it('displays the product and product variant title', () => {
  const args = AshTray.args as ProductReviewFormProps

  const { getByText } = render(<AshTray {...args} />)

  const product_title = args.title
  const variant_title = args.variants[0].title

  expect(getByText(product_title)).toBeInTheDocument()
  expect(getByText(variant_title)).toBeInTheDocument()
})

it('updates the product variant title when a selection is made', () => {
  const args = AshTray.args as ProductReviewFormProps

  const { getByText } = render(<AshTray {...args} />)

  // Get variant to select
  const variant2 = args.variants[1]

  // Mock user selection
  User.selectOptions(screen.getByPlaceholderText(SELECT_PLACEHOLDER), [
    variant2.id
  ])

  // Expect selected variant title to be shown in form title
  expect(getByText(variant2.title)).toBeInTheDocument()
})

it("updates the customer's email address", () => {
  const args = AshTray.args as ProductReviewFormProps

  render(<AshTray {...args} />)

  // Get customer email <input> element
  const c_email = screen.getByPlaceholderText(EMAIL_INPUT_PLACEHOLDER)

  // Click customer email <input> and enter email address
  User.click(c_email)
  User.type(c_email, EMAIL_INPUT_PLACEHOLDER)

  // Expect updated <input> value
  expect((c_email as HTMLInputElement).value).toBe(EMAIL_INPUT_PLACEHOLDER)
})

it('updates the product review title', () => {
  const args = AshTray.args as ProductReviewFormProps

  render(<AshTray {...args} />)

  // Get review title <input> element
  const review_title = screen.getByPlaceholderText(TITLE_INPUT_PLACEHOLDER)

  // Click review title <input> and enter title
  User.click(review_title)
  User.type(review_title, TITLE_INPUT_PLACEHOLDER)

  // Expect updated <input> value
  expect((review_title as HTMLInputElement).value).toBe(TITLE_INPUT_PLACEHOLDER)
})

it('updates the product review body', () => {
  const args = AshTray.args as ProductReviewFormProps

  render(<AshTray {...args} />)

  // Get review body <textarea> element
  const review_body = screen.getByPlaceholderText(TEXTAREA_PLACEHOLDER)

  // Click review body <input> and enter body
  User.click(review_body)
  User.type(review_body, TEXTAREA_PLACEHOLDER)

  // Expect updated <input> value
  expect((review_body as HTMLInputElement).value).toBe(TEXTAREA_PLACEHOLDER)
})
