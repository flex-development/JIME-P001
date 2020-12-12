import { render } from '@testing-library/react'
import { Footer } from './Footer'

/**
 * @file Unit Tests - Footer
 * @module components/atoms/Footer/spec
 */

it('renders a <footer> element', () => {
  const { container } = render(<Footer />)

  expect(container.firstChild).toMatchInlineSnapshot('<footer />')
})
