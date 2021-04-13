import type { RenderResult } from '@testing-library/react'
import { render } from '@testing-library/react'
import { AshTray } from '../ProductReviewDialog.stories'

/**
 * @file Unit Tests - ProductReviewDialog
 * @module lib/molecules/ProductReviewDialog/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:ProductReviewDialog', () => {
  let view = {} as RenderResult

  beforeEach(() => {
    view = render(<AshTray {...AshTray.args} />)
  })

  describe('html', () => {
    it('renders with class "product-review-dialog"', () => {
      const eclass = 'product-review-dialog'

      expect(view.container.firstChild).toHaveClass(eclass)
    })
  })
})
