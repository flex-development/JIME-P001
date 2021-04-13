import { render, screen } from '@testing-library/react'
import User from '@testing-library/user-event'
import { AshTray } from '../ProductTemplate.stories'

/**
 * @file Integration Tests - ProductTemplate
 * @module lib/templates/ProductTemplate/tests/integration
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('integration:ProductTemplate', () => {
  beforeEach(() => {
    render(<AshTray {...AshTray.args} />)
  })

  describe('simulate user', () => {
    it('open product review dialog', () => {
      // ! Simulate user clicking dialog button
      User.click(screen.getByRole('button', { name: /submit product review/i }))

      expect(screen.getByText(/product review/i)).toBeInTheDocument()
    })
  })
})
