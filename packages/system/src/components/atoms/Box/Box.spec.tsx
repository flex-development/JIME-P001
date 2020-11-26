import { render } from '@testing-library/react'
import React from 'react'
import { Box } from './Box'

/**
 * @file Unit Tests - Box
 * @module components/atoms/Box/spec
 */

it('renders <div />', () => {
  const { container } = render(<Box />)

  expect(container.firstChild).toMatchInlineSnapshot('<div />')
})
