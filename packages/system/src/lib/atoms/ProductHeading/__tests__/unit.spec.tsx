import { render } from '@testing-library/react'
import { AshTray } from '../ProductHeading.stories'

/**
 * @file Unit Tests - ProductHeading
 * @module lib/atoms/ProductHeading/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:ProductHeading', () => {
  it('renders heading element with class "product-heading"', () => {
    const { container } = render(<AshTray {...AshTray.args} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('h1')
    expect(container?.firstChild).toHaveClass('product-heading')
  })

  describe('props', () => {
    describe('price', () => {
      it('renders product price', () => {
        const { getByText } = render(<AshTray {...AshTray.args} />)

        const element = getByText(`$${AshTray.args.price}`)

        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('product-heading-price')
      })
    })

    describe('title', () => {
      it('renders product title', () => {
        const { getByText } = render(<AshTray {...AshTray.args} />)

        const element = getByText(AshTray.args.title)

        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('product-heading-title')
      })
    })
  })
})
