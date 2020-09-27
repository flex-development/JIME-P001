import { Section } from '@kustomz/lib'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Unit Tests - Section
 * @module tests/elements/Section
 */

it('renders a <section> element', () => {
  const { container } = render(<Section />)

  expect(container.firstChild).toMatchInlineSnapshot('<section />')
})