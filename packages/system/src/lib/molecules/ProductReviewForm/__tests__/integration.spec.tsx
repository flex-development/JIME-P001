import { EMAIL_PLACEHOLDER } from '@system/config/constants'
import { render, screen, waitFor } from '@testing-library/react'
import User from '@testing-library/user-event'
import { ProductReviewForm } from '../ProductReviewForm'
import { AshTray } from '../ProductReviewForm.stories'

/**
 * @file Integration Tests - ProductReviewForm
 * @module lib/molecules/ProductReviewForm/tests/integration
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

const {
  BODY_PLACEHOLDER,
  SELECT_PLACEHOLDER,
  TITLE_PLACEHOLDER
} = ProductReviewForm

describe('integration:ProductReviewForm', () => {
  describe('initial state', () => {
    it('disables submit button', () => {
      render(<AshTray {...AshTray.args} />)

      const button = screen.getByRole('button', { name: /submit review/i })

      expect(button).toBeDisabled()
    })
  })

  describe('simulate user', () => {
    it('change variant to review', () => {
      render(<AshTray {...AshTray.args} />)

      // Get data from variant to select
      const { id, title } = AshTray.args.variants[1]

      // Get <select> element
      const element = screen.getByPlaceholderText(SELECT_PLACEHOLDER)

      // ! Simulate user selection
      User.selectOptions(element, [`${id}`])

      // Expect selected variant title to be shown in form title
      expect(screen.getAllByText(title)[0]).toBeInTheDocument()
    })

    it.skip('populate and submit form', async () => {
      const handleSubmit = jest.fn()

      render(<AshTray {...AshTray.args} handleSubmit={handleSubmit} />)

      // Get form control elements and submit button
      const control_body = screen.getByPlaceholderText(BODY_PLACEHOLDER)
      const control_email = screen.getByPlaceholderText(EMAIL_PLACEHOLDER)
      const control_title = screen.getByPlaceholderText(TITLE_PLACEHOLDER)

      // ! Simulate user filling out form
      User.click(control_email)
      User.type(control_email, EMAIL_PLACEHOLDER)
      User.click(control_body)
      User.type(control_body, BODY_PLACEHOLDER)
      User.click(control_title)
      User.type(control_title, TITLE_PLACEHOLDER)

      // Expect form values to be updated
      await waitFor(() => {
        expect(control_email).toHaveValue(EMAIL_PLACEHOLDER)
        expect(control_body).toHaveValue(BODY_PLACEHOLDER)
        expect(control_title).toHaveValue(TITLE_PLACEHOLDER)
      })

      // ! Simulate user submitting form
      User.click(screen.getByRole('button', { name: /submit review/i }))

      // Expect handleSubmit callback to fire
      await waitFor(() => {
        expect(handleSubmit).toBeCalledTimes(1)
        expect(handleSubmit).toBeCalledWith({
          body: BODY_PLACEHOLDER,
          email: EMAIL_PLACEHOLDER,
          product_sku: AshTray.args.variants[0].sku,
          rating: 5,
          title: TITLE_PLACEHOLDER
        })
      })
    })
  })
})
