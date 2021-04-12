import { EMAIL_PLACEHOLDER } from '@system/config/constants'
import ASH_TRAY from '@system/tests/fixtures/api/products/ash-tray'
import { render, screen, waitFor } from '@testing-library/react'
import User from '@testing-library/user-event'
import { ProductReviewForm } from '../ProductReviewForm'
import { AshTray } from '../ProductReviewForm.stories'

/**
 * @file Integration Tests - ProductReviewForm
 * @module lib/molecules/ProductReviewForm/tests/integration
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

const { BODY_PLACEHOLDER, TITLE_PLACEHOLDER } = ProductReviewForm

describe('integration:ProductReviewForm', () => {
  describe('initial state', () => {
    it.skip('disables submit button', () => {
      render(<AshTray {...AshTray.args} />)

      const button = screen.getByRole('button', { name: /submit review/i })

      expect(button).toBeDisabled()
    })
  })

  describe('simulate user', () => {
    it.skip('populate and submit form', async () => {
      const handler = jest.fn()

      render(<AshTray {...AshTray.args} handler={handler} />)

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

      // Expect form handler callback to fire
      await waitFor(() => {
        expect(handler).toBeCalledTimes(1)
        expect(handler).toBeCalledWith({
          body: BODY_PLACEHOLDER,
          email: EMAIL_PLACEHOLDER,
          id: ASH_TRAY.product_id,
          rating: 5,
          title: TITLE_PLACEHOLDER
        })
      })
    })
  })
})
