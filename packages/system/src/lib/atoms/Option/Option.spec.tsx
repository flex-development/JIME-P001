import { render } from '@testing-library/react'
import { Form } from './Option.stories'

/**
 * @file Tests - Option
 * @module lib/atoms/Option/spec
 */

describe('Option', () => {
  it('renders an <option> element', () => {
    const { container } = render(<Form {...Form.args} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('option')
  })

  it('renders the label text', () => {
    const { getByLabelText } = render(<Form {...Form.args} />)

    expect(getByLabelText(Form.args.label as string)).toBeInTheDocument()
  })
})
