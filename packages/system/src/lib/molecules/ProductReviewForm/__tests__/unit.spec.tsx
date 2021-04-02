import { render, screen } from '@testing-library/react'
import { AshTray } from '../ProductReviewForm.stories'

/**
 * @file Unit Tests - ProductReviewForm
 * @module lib/molecules/ProductReviewForm/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:ProductReviewForm', () => {
  describe('html', () => {
    it('renders with class "product-review-form"', () => {
      const { container } = render(<AshTray {...AshTray.args} />)

      expect(container.firstChild).toHaveClass('product-review-form')
    })
  })

  describe('props', () => {
    describe('description', () => {
      it('renders', () => {
        render(<AshTray {...AshTray.args} />)

        const text = AshTray.args.description as string

        expect(screen.getByText(text)).toHaveClass('product-review-form-text')
      })
    })

    describe('id', () => {
      it('renders with attribute `id`', () => {
        const { container } = render(<AshTray {...AshTray.args} />)

        const id = `product-review-form-${AshTray.args.id}`

        expect(container.firstChild).toHaveAttribute('id', id)
      })
    })

    describe('title', () => {
      it('renders product title', () => {
        render(<AshTray {...AshTray.args} />)

        expect(screen.getByText(AshTray.args.title)).toBeInTheDocument()
      })
    })

    describe('variants', () => {
      it('renders as <select name="variant"> options', () => {
        render(<AshTray {...AshTray.args} />)

        const options = screen.queryAllByRole('option')

        expect(options.length).toBe(AshTray.args.variants.length)
      })
    })
  })
})
