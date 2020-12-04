import { render } from '@testing-library/react'
import { Box } from './Box'

/**
 * @file Unit Tests - Box
 * @module components/atoms/Box/impl
 */

it('renders <div />', () => {
  const { container } = render(<Box />)

  expect(container.firstChild).toMatchInlineSnapshot('<div />')
})
