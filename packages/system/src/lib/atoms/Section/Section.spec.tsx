import { render } from '@testing-library/react'
import { Section } from './Section'

/**
 * @file Tests - Section
 * @module lib/atoms/Section/spec
 */

describe('Section', () => {
  it('renders a <section> element', () => {
    const { container } = render(<Section />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('section')
  })

  it('renders with class "content-section"', () => {
    const { container } = render(<Section $content />)

    expect(container.firstChild).toHaveClass('content-section')
  })
})
