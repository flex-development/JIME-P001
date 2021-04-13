import type { RenderResult } from '@testing-library/react'
import { render, screen } from '@testing-library/react'
import { AshTray } from '../ProductReviewForm.stories'

/**
 * @file Unit Tests - ProductReviewForm
 * @module lib/molecules/ProductReviewForm/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:ProductReviewForm', () => {
  const handler = jest.fn()

  let view = {} as RenderResult

  beforeEach(() => {
    view = render(<AshTray {...AshTray.args} handler={handler} />)
  })

  describe('html', () => {
    it('renders with class "product-review-form"', () => {
      expect(view.container.firstChild).toHaveClass('product-review-form')
    })
  })

  describe('props', () => {
    describe('id', () => {
      it('renders with attribute `id`', () => {
        const id = `product-review-form-${AshTray.args.id}`

        expect(view.container.firstChild).toHaveAttribute('id', id)
      })
    })

    describe('title', () => {
      it('renders product title', () => {
        expect(screen.getByText(AshTray.args.title)).toBeInTheDocument()
      })
    })
  })
})
