import { render } from '@testing-library/react'
import { Default } from '../ProductBreadcrumb.stories'

/**
 * @file Unit Tests - ProductBreadcrumb
 * @module lib/molecules/ProductBreadcrumb/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:ProductBreadcrumb', () => {
  describe('html', () => {
    it('renders with class "product-breadcrumb"', () => {
      const { container } = render(<Default {...Default.args} />)

      expect(container.firstChild).toHaveClass('product-breadcrumb')
    })
  })

  describe('props', () => {
    describe('collection', () => {
      it('renders link to product collection', () => {
        const { getByRole } = render(<Default {...Default.args} />)

        const name = new RegExp(Default.args.collection.title as string, 'i')

        expect(getByRole('link', { name })).toBeInTheDocument()
      })
    })

    describe('product', () => {
      it('renders product title', () => {
        const { getByText } = render(<Default {...Default.args} />)

        const product = Default.args.product as string

        expect(getByText(product)).toHaveClass('product-breadcrumb-p')
      })
    })

    describe('variant', () => {
      it('renders product variant title', () => {
        const { getByText } = render(<Default {...Default.args} />)

        const variant = Default.args.variant as string

        expect(getByText(variant)).toHaveClass('product-breadcrumb-v')
      })
    })
  })
})
