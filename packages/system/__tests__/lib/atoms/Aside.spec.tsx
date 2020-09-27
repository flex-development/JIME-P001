import { Aside } from '@kustomz/lib'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Unit Tests - Aside
 * @module tests/elements/Aside
 */

it('renders an <aside> element', () => {
  const { container } = render(<Aside />)

  expect(container.firstChild).toMatchInlineSnapshot('<aside />')
})

it('renders <aside class="bg-dark" />', () => {
  const { container } = render(<Aside variant='dark' />)

  expect(container.firstChild).toHaveClass('bg-dark')
})
