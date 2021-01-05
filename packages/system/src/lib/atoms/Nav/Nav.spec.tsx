import { render } from '@testing-library/react'
import { Nav } from './Nav'

/**
 * @file Tests - Nav
 * @module lib/atoms/Nav/spec
 */

describe('Nav', () => {
  it('renders a <nav> element', () => {
    const { container } = render(<Nav />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('nav')
  })
})
