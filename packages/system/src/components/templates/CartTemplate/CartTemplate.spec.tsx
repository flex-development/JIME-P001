import { render } from '@testing-library/react'
import React from 'react'
import { CartTemplate } from './CartTemplate'
import { Cart } from './CartTemplate.stories'

/**
 * @file Tests - CartTemplate
 * @module components/templates/CartTemplate/spec
 */

it('renders without crashing', () => {
  const { template_id } = CartTemplate

  const { container } = render(<Cart {...Cart.args} />)

  expect(container.firstChild).toHaveClass('template')
  expect(container.firstChild).toHaveAttribute('data-template', template_id)
})

it('renders the template title with the number of items in the cart', () => {
  const { getByText } = render(<Cart {...Cart.args} />)

  expect(getByText(`Cart (${Cart.args.items?.length})`)).toBeInTheDocument()
})

it('renders the cart subtotal', () => {
  const { getByText } = render(<Cart {...Cart.args} />)

  expect(getByText(`Subtotal / $${Cart.args?.subtotal}`)).toBeInTheDocument()
})
