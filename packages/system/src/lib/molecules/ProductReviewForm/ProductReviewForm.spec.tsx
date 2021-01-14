import { EMAIL_PLACEHOLDER } from '@system/config/constants'
import { render, screen } from '@testing-library/react'
import User from '@testing-library/user-event'
import { ProductReviewForm } from './ProductReviewForm'
import { AshTray } from './ProductReviewForm.stories'

/**
 * @file Tests - ProductReviewForm
 * @module lib/molecules/ProductReviewForm/spec
 */

const {
  BODY_PLACEHOLDER,
  SELECT_PLACEHOLDER,
  TITLE_PLACEHOLDER
} = ProductReviewForm

describe('ProductReviewForm', () => {
  it('renders with class "product-review-form"', () => {
    const { container } = render(<AshTray {...AshTray.args} />)

    expect(container.firstChild).toHaveClass('product-review-form')
  })

  it('displays the product and product variant title', () => {
    const { getByText } = render(<AshTray {...AshTray.args} />)

    const product_title = AshTray.args.title
    const variant_title = AshTray.args.variants[0].title

    expect(getByText(product_title)).toBeInTheDocument()
    expect(getByText(variant_title)).toBeInTheDocument()
  })

  it('updates the product variant title when a selection is made', () => {
    const { getByText } = render(<AshTray {...AshTray.args} />)

    // Get variant to select
    const variant2 = AshTray.args.variants[1]

    // Mock user selection
    User.selectOptions(screen.getByPlaceholderText(SELECT_PLACEHOLDER), [
      `${variant2.id}`
    ])

    // Expect selected variant title to be shown in form title
    expect(getByText(variant2.title)).toBeInTheDocument()
  })

  it("updates the customer's email address", () => {
    render(<AshTray {...AshTray.args} />)

    // Get customer email <input> element
    const c_email = screen.getByPlaceholderText(EMAIL_PLACEHOLDER)

    // Click customer email <input> and enter email address
    User.click(c_email)
    User.type(c_email, EMAIL_PLACEHOLDER)

    // Expect updated <input> value
    expect((c_email as HTMLInputElement).value).toBe(EMAIL_PLACEHOLDER)
  })

  it('updates the product review title', () => {
    render(<AshTray {...AshTray.args} />)

    // Get review title <input> element
    const review_title = screen.getByPlaceholderText(TITLE_PLACEHOLDER)

    // Click review title <input> and enter title
    User.click(review_title)
    User.type(review_title, TITLE_PLACEHOLDER)

    // Expect updated <input> value
    expect((review_title as HTMLInputElement).value).toBe(TITLE_PLACEHOLDER)
  })

  it('[FALSE ALARM] updates the product review body', () => {
    render(<AshTray {...AshTray.args} />)

    // Get review body <textarea> element
    const review_body = screen.getByPlaceholderText(BODY_PLACEHOLDER)

    // Click review body <input> and enter body
    User.click(review_body)
    User.type(review_body, BODY_PLACEHOLDER)

    // Expect updated <input> value
    expect((review_body as HTMLInputElement).value).toBe(BODY_PLACEHOLDER)
  })
})
