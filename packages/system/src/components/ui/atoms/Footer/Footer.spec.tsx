import { render } from '@testing-library/react'
import { Footer } from './Footer'

/**
 * @file Tests - Footer
 * @module components/ui/atoms/Footer/spec
 */

describe('Footer', () => {
  it('renders a <footer> element', () => {
    const { container } = render(<Footer />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('footer')
  })
})
