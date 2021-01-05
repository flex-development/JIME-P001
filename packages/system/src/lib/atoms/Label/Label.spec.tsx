import { render } from '@testing-library/react'
import { Default, Form } from './Label.stories'

/**
 * @file Tests - Label
 * @module lib/atoms/Label/spec
 */

describe('Label', () => {
  it('renders a <label> element', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('label')
  })

  it('renders with class "form-label" when props.form is true', () => {
    const { container } = render(<Form {...Form.args} />)

    expect(container.firstChild).toHaveClass('form-label')
  })
})
