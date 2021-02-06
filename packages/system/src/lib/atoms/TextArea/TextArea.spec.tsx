import { render } from '@testing-library/react'
import { Form } from './TextArea.stories'

/**
 * @file Tests - TextArea
 * @module lib/atoms/TextArea/spec
 */

describe('TextArea', () => {
  it('renders a <textarea> element', () => {
    const { container } = render(<Form {...Form.args} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('textarea')
  })

  it('renders with class "form-control"', () => {
    const { container } = render(<Form {...Form.args} />)

    expect(container.firstChild).toHaveClass('form-control')
  })
})
