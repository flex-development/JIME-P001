import { render } from '@testing-library/react'
import { Aside } from './Aside'

/**
 * @file Tests - Aside
 * @module components/ui/atoms/Aside/spec
 */

describe('Aside', () => {
  it('renders an <aside> element', () => {
    const { container } = render(<Aside />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('aside')
  })
})
