import { Aside } from '@system/components'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Unit Tests - Aside
 * @module tests/lib/atoms/Aside
 */

it('renders an <aside> element', () => {
  const { container } = render(<Aside />)

  expect(container.firstChild).toMatchInlineSnapshot('<aside />')
})
