import { Header } from '@system/lib'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Unit Tests - Header
 * @module tests/lib/atoms/Header
 */

it('renders a <header> element', () => {
  const { container } = render(<Header />)

  expect(container.firstChild).toMatchInlineSnapshot('<header />')
})
