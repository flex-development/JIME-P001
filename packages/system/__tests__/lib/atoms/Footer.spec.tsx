import { Footer } from '@kustomz/lib'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Unit Tests - Footer
 * @module tests/elements/Footer
 */

it('renders a <footer> element', () => {
  const { container } = render(<Footer />)

  expect(container.firstChild).toMatchInlineSnapshot('<footer />')
})
