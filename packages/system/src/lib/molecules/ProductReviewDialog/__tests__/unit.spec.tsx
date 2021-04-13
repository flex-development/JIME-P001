import type { RenderResult } from '@testing-library/react'
import { render, screen } from '@testing-library/react'
import User from '@testing-library/user-event'
import { AshTray } from '../ProductReviewDialog.stories'

/**
 * @file Unit Tests - ProductReviewDialog
 * @module lib/molecules/ProductReviewDialog/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:ProductReviewDialog', () => {
  const onClose = jest.fn()

  let view = {} as RenderResult

  beforeEach(() => {
    view = render(<AshTray {...AshTray.args} onClose={onClose} />)
  })

  describe('html', () => {
    it('renders with class "product-review-dialog"', () => {
      const eclass = 'product-review-dialog'

      expect(view.container.firstChild).toHaveClass(eclass)
    })
  })

  describe('callbacks', () => {
    it('calls onClose', () => {
      // Get close button
      const button = screen.getByRole('button', { name: /close dialog/i })

      // ! Simulate user clicking close button
      User.click(button)

      expect(onClose).toBeCalledTimes(1)
      expect(onClose.mock.calls[0][0].target).toBe(button)
    })
  })
})
