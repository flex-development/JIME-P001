import { render } from '@testing-library/react'
import { Aside } from './Aside'

/**
 * @file Unit Tests - Aside
 * @module components/ui/atoms/Aside/spec
 */

it('renders an <aside> element', () => {
  const { container } = render(<Aside />)

  expect(container.firstChild).toMatchInlineSnapshot('<aside />')
})
