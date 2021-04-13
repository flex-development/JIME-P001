import type { RenderResult } from '@testing-library/react'
import { render, screen } from '@testing-library/react'
import User from '@testing-library/user-event'
import { AshTray } from '../ProductReviewDialog.stories'

/**
 * @file Integration Tests - ProductReviewDialog
 * @module lib/molecules/ProductReviewDialog/tests/integration
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('integration:ProductReviewDialog', () => {
  let view = {} as RenderResult

  beforeEach(() => {
    view = render(<AshTray {...AshTray.args} />)
  })

  describe('simulate user', () => {
    it('closes dialog', () => {
      // ! Simulate user clicking close button
      User.click(screen.getByRole('button', { name: /close dialog/i }))

      expect(view.container.firstChild).not.toBeVisible()
    })
  })
})
