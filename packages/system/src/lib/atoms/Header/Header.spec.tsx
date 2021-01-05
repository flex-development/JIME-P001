import { render } from '@testing-library/react'
import { Header } from './Header'

/**
 * @file Tests - Header
 * @module lib/atoms/Header/spec
 */

describe('Header', () => {
  it('renders a <header> element', () => {
    const { container } = render(<Header />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('header')
  })
})
