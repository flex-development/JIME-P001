import { render, screen } from '@testing-library/react'
import { AshTray } from '../ProductCard.stories'

/**
 * @file Unit Tests - ProductCard
 * @module lib/molecules/ProductCard/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:ProductCard', () => {
  describe('html', () => {
    it('renders with class "product-card"', () => {
      const { container } = render(<AshTray {...AshTray.args} />)

      expect(container.firstChild).toHaveClass('product-card')
    })
  })

  describe('props', () => {
    const { images, title, variants } = AshTray.args.product

    describe('product', () => {
      it('renders default product image', () => {
        render(<AshTray {...AshTray.args} />)

        const image = images.find(({ id }) => id === variants[0].image_id)

        expect(screen.getByAltText(image?.alt as string)).toBeInTheDocument()
      })

      it('renders default product price', () => {
        render(<AshTray {...AshTray.args} />)

        const price = new RegExp(variants[0].price, 'i')

        expect(screen.getByText(price)).toBeInTheDocument()
      })

      it('renders default product option', () => {
        render(<AshTray {...AshTray.args} />)

        const name = new RegExp(variants[0].title, 'i')

        expect(screen.getByRole('link', { name })).toBeInTheDocument()
      })

      it('renders product title', () => {
        render(<AshTray {...AshTray.args} />)

        expect(screen.getByRole('link', { name: title })).toBeInTheDocument()
      })
    })
  })
})
