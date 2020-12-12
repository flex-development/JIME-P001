import { render } from '@testing-library/react'
import { Header } from './Header'

/**
 * @file Unit Tests - Header
 * @module components/atoms/Header/spec
 */

it('renders a <header> element', () => {
  const { container } = render(<Header />)

  expect(container.firstChild).toMatchInlineSnapshot('<header />')
})
