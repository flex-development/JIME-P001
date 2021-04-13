import type { JudgeMeReviewCreateDataDTO as ReviewDTO } from '@core/types'
import CUSTOMERS from '@kapi/tests/fixtures/shopify/customers'
import { render, screen, waitFor } from '@testing-library/react'
import User from '@testing-library/user-event'
import { AshTray } from '../ProductReviewForm.stories'

/**
 * @file Integration Tests - ProductReviewForm
 * @module lib/molecules/ProductReviewForm/tests/integration
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('integration:ProductReviewForm', () => {
  describe('initial state', () => {
    it('disables submit button', () => {
      render(<AshTray {...AshTray.args} />)

      const button = screen.getByRole('button', { name: /submit review/i })

      expect(button).toBeDisabled()
    })
  })

  describe('simulate user', () => {
    const dto: ReviewDTO = {
      body: '👍🏾 👍🏾 👍🏾',
      email: CUSTOMERS[0].email,
      id: AshTray.args.id,
      rating: 5,
      title: null
    }

    it.todo('displays submission error message')

    it('populate and submit form', async () => {
      const handler = jest.fn()

      render(<AshTray {...AshTray.args} handler={handler} />)

      // Get form fields and submit button
      const body = screen.getByRole('textbox', { name: 'body' })
      const email = screen.getByRole('textbox', { name: 'email' })
      const sbutton = screen.getByRole('button', { name: /submit review/i })

      // ! Simulate user filling out form
      User.type(email, dto.email)
      User.type(body, dto.body)

      // Expect form values to be updated
      await waitFor(() => {
        expect(email).toHaveValue(dto.email)
        expect(body).toHaveValue(dto.body)
        expect(sbutton).toBeEnabled()
      })

      // ! Simulate user submitting form
      User.click(sbutton)

      // Expect form handler callback to fire
      await waitFor(() => {
        expect(handler).toBeCalledTimes(1)

        expect(handler.mock.calls[0][0]).toMatchObject(dto)
        expect(handler.mock.calls[0][1].target).toBe(sbutton)
      })
    })
  })
})
