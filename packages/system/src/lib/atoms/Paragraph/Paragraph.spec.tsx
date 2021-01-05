import { render } from '@testing-library/react'
import { Default, Form } from './Paragraph.stories'

/**
 * @file Tests - Paragraph
 * @module lib/atoms/Paragraph/spec
 */

describe('Paragraph', () => {
  it('renders a <p> element', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('p')
  })

  it('renders the paragraph text', () => {
    const { getByText } = render(<Default {...Default.args} />)

    expect(getByText(Default.args.children as string)).toBeInTheDocument()
  })

  it('renders with class "form-text"', () => {
    const { container } = render(<Form {...Form.args} />)

    expect(container.firstChild).toHaveClass('form-text')
  })
})
