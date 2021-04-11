import type { RenderResult } from '@testing-library/react'
import { render, screen } from '@testing-library/react'
import { Default } from '../ProductReview.stories'

/**
 * @file Unit Tests - ProductReview
 * @module lib/molecules/ProductReview/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:ProductReview', () => {
  const {
    body,
    created_at,
    id,
    product_handle,
    product_title,
    rating,
    title
  } = Default.args.review

  const reviewer = { name: 'Test' }

  let view = {} as RenderResult

  beforeEach(() => {
    view = render(<Default review={{ ...Default.args.review, reviewer }} />)
  })

  describe('html', () => {
    it('renders with class "product-review"', () => {
      expect(view.container.firstChild).toHaveClass('product-review')
    })

    it(`renders with id "product-review-${id}"`, () => {
      const eid = `product-review-${id}`

      expect(view.container.firstChild).toHaveAttribute('id', eid)
    })
  })

  describe('props', () => {
    describe('review', () => {
      it('renders body', () => {
        expect(screen.getByText(body)).toBeInTheDocument()
      })

      it('renders formatted created_at', () => {
        const f_created_at = new Date(created_at).toLocaleDateString('en-US')

        expect(screen.getByText(new RegExp(f_created_at))).toBeInTheDocument()
      })

      it('renders link to product', () => {
        const element = screen.getByRole('link', { name: /view product/i })

        expect(element).toBeInTheDocument()
        expect(element).toHaveAttribute('href', `/products/${product_handle}`)
        expect(element).toHaveTextContent(product_title)
      })

      it('renders rating', () => {
        const element = view.container.firstChild?.firstChild

        expect(element).toHaveAttribute('data-rating', `${rating}`)
      })

      describe('reviewer', () => {
        it('renders reviewer initials', () => {
          const eclass = 'product-review-reviewer-initials'

          expect(screen.getByText(reviewer.name[0])).toHaveClass(eclass)
        })

        it('renders reviewer name', () => {
          expect(screen.getByText(reviewer.name)).toBeInTheDocument()
        })
      })

      describe('title', () => {
        it('renders title', () => {
          expect(screen.getByText(title as string)).toBeInTheDocument()
        })

        it('renders id as title if review.title is nullish', () => {
          const review = { ...Default.args.review, title: null }
          const eclass = 'product-review-header-title'

          render(<Default review={review} />)

          expect(screen.getByText(new RegExp(`${id}`))).toHaveClass(eclass)
        })
      })
    })
  })
})
