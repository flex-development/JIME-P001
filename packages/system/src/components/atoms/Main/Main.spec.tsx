import { render } from '@testing-library/react'
import { Main } from './Main'

/**
 * @file Unit Tests - Main
 * @module components/atoms/Main/spec
 */

it('renders a <main> element', () => {
  const { container } = render(<Main />)

  expect(container.firstChild).toMatchInlineSnapshot('<main />')
})
