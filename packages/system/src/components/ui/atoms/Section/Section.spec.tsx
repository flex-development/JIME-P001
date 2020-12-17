import { render } from '@testing-library/react'
import { Section } from './Section'

/**
 * @file Tests - Section
 * @module components/ui/atoms/Section/spec
 */

describe('Section', () => {
  it('renders a <section> element', () => {
    const { container } = render(<Section />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('section')
  })
})
