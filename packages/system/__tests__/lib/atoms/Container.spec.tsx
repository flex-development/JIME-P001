import { Container } from '@kustomz/lib'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - Container
 * @module tests/lib/atoms/Container
 * @see https://v5.getbootstrap.com/docs/5.0/layout/containers/
 */

it('renders <div class="container">', () => {
  const { container } = render(<Container />)

  expect(container.firstChild).toHaveClass('container')
})

it('renders <div class="container-fluid">', () => {
  const { container } = render(<Container fluid />)

  expect(container.firstChild).not.toHaveClass('container')
  expect(container.firstChild).toHaveClass('container-fluid')
})

it('renders a responsive container', () => {
  const { container } = render(<Container size='lg' />)

  expect(container.firstChild).not.toHaveClass('container')
  expect(container.firstChild).toHaveClass('container-lg')
})
