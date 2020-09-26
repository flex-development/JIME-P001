import { Main } from '@kustomz/lib'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Unit Tests - Main
 * @module tests/elements/Main
 */

it('renders a <main> element', () => {
  const { container } = render(<Main />)

  expect(container.firstChild).toMatchInlineSnapshot('<main />')
})
