import { Box } from '@kustomz/lib'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Unit Tests - Box
 * @module tests/lib/atoms/Box
 */

it('renders <div />', () => {
  const { container } = render(<Box />)

  expect(container.firstChild).toMatchInlineSnapshot('<div />')
})
