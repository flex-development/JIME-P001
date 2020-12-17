import { render } from '@testing-library/react'
import { Nav } from './Nav'

/**
 * @file Tests - Nav
 * @module components/ui/atoms/Nav/spec
 */

describe('Nav', () => {
  it('renders a <nav> element', () => {
    const { container } = render(<Nav />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('nav')
  })

  it('renders with class "nav"', () => {
    const { container } = render(<Nav />)

    expect(container.firstChild).toHaveClass('nav')
  })

  it('renders with class "nav-fill"', () => {
    const { container } = render(<Nav fill />)

    expect(container.firstChild).toHaveClass('nav-fill')
  })

  it('renders with class "nav-pills"', () => {
    const { container } = render(<Nav pills />)

    expect(container.firstChild).toHaveClass('nav-pills')
  })

  it('renders with class "nav-tabs"', () => {
    const { container } = render(<Nav tabs />)

    expect(container.firstChild).toHaveClass('nav-tabs')
  })
})
