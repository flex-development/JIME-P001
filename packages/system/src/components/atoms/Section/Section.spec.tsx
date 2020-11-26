import { render } from '@testing-library/react'
import React from 'react'
import { Section } from './Section'

/**
 * @file Unit Tests - Section
 * @module components/atoms/Section/spec
 */

it('renders a <section> element', () => {
  const { container } = render(<Section />)

  expect(container.firstChild).toMatchInlineSnapshot('<section />')
})
