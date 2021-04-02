import type { ProductListingData } from '@kustomzcore/types'
import { render, screen } from '@testing-library/react'
import { Default } from '../ProductGrid.stories'

/**
 * @file Unit Tests - ProductGrid
 * @module lib/organisms/ProductGrid/tests/unit
 */

describe('unit:ProductGrid', () => {
  describe('html', () => {
    it('renders <section> element with class "product-grid"', () => {
      const { container } = render(<Default {...Default.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('section')
      expect(container.firstChild).toHaveClass('product-grid')
    })
  })

  describe('props', () => {
    describe('max', () => {
      it('limits number of grid items to display', () => {
        const max = 1

        const { container } = render(<Default {...Default.args} max={max} />)

        expect(container.firstChild?.childNodes.length).toBe(max)
      })
    })

    describe('products', () => {
      it('renders grid products', () => {
        const products = Default.args.products as ProductListingData[]

        render(<Default {...Default.args} />)

        products.map(({ title }) => {
          const element = screen.getByRole('link', { name: title })

          expect(element).toHaveClass('product-card-title')
        })
      })
    })
  })
})
