import REVIEWS from '@system/tests/fixtures/api/reviews'
import { render, screen } from '@testing-library/react'
import { Carousel } from '../Carousel'
import { ProductImages, ProductReviews } from '../Carousel.stories'

/**
 * @file Unit Tests - Carousel
 * @module lib/molecules/Carousel/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:Carousel', () => {
  describe('html', () => {
    it('renders with class "carousel"', () => {
      const { container } = render(<Carousel />)

      expect(container.firstChild).toHaveClass('carousel')
    })

    it('renders carousel indicators', () => {
      render(<ProductImages {...ProductImages.args} />)

      // Expect number of carousel indicators to match number of items
      const name = /carousel indicator/i
      const indicators = screen.queryAllByRole('button', { name })

      expect(indicators.length).toBe(ProductImages.args.children?.length)
    })
  })

  describe('props', () => {
    describe('children', () => {
      it('renders carousel items', () => {
        const view = render(<ProductReviews {...ProductReviews.args} />)
        const { firstChild } = view.container

        const items = ProductReviews.args.children

        // Expect each carousel item to be in the document
        expect(firstChild?.firstChild?.childNodes.length).toBe(items?.length)
      })
    })

    describe('chunk_max', () => {
      const chunk_max = 2

      it('renders with attribute `data-chunk-max`', () => {
        const { container } = render(<Carousel chunk_max={chunk_max} />)

        expect(container.firstChild).toHaveAttribute('data-chunk-max')
      })

      it('renders with grouped carousel items', () => {
        const props = { ...ProductReviews.args, chunk_max }
        const { container } = render(<ProductReviews {...props} />)

        // Get carousel slide container
        const inner = container.firstChild?.firstChild as HTMLElement

        // At the very least, given the correct number of slides, the first
        // carousel slide should contain multiple elements
        expect(inner.firstChild?.childNodes.length).toBe(chunk_max)
      })
    })

    describe('position', () => {
      it('sets initial carousel slide to display', () => {
        const review = REVIEWS[ProductReviews.args.position as number]

        const view = render(<ProductReviews {...ProductReviews.args} />)

        expect(view.getByText(review.title)).toBeInTheDocument()
      })
    })
  })
})
