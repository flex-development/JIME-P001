import { CartTemplate } from '@system/lib'
import { Cart } from '@system/stories/lib/templates/CartTemplate.stories'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - CartTemplate
 * @module tests/lib/templates/CartTemplate
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
