import { render, screen } from '@testing-library/react'
import { AllProducts } from '../CollectionTemplate.stories'

/**
 * @file Unit Tests - CollectionTemplate
 * @module lib/templates/CollectionTemplate/tests/unit
 */

describe('unit:CollectionTemplate', () => {
  const { collection, products = [] } = AllProducts.args

  describe('html', () => {
    it('renders <main> element with class "collection-template"', () => {
      const { container } = render(<AllProducts {...AllProducts.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('main')
      expect(container.firstChild).toHaveClass('collection-template')
    })
  })

  describe('props', () => {
    describe('collection', () => {
      const { body_html = '', title = '' } = collection

      it('renders collection description', () => {
        render(<AllProducts {...AllProducts.args} />)

        expect(screen.getByText(body_html)).toBeInTheDocument()
      })

      it('renders collection title', () => {
        render(<AllProducts {...AllProducts.args} />)

        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
      })
    })
  })

  describe('callbacks', () => {
    it('calls handleProductLink', () => {
      const props = { ...AllProducts.args, handleProductLink: jest.fn() }

      render(<AllProducts {...props} />)

      expect(props.handleProductLink).toBeCalledTimes(products.length)
    })
  })
})
