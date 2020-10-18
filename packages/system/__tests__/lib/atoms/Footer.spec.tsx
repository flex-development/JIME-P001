import { Footer } from '@system/lib'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Unit Tests - Footer
 * @module tests/lib/atoms/Footer
 */

it('renders a <footer> element', () => {
  const { container } = render(<Footer />)

  expect(container.firstChild).toMatchInlineSnapshot('<footer />')
})
