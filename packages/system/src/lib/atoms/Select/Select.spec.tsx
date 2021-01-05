import { render } from '@testing-library/react'
import { Default, Form } from './Select.stories'

/**
 * @file Tests - Select
 * @module lib/atoms/Select/spec
 */

describe('Select', () => {
  it('renders a <select> element', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('select')
  })

  it('renders with nested elements', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild).not.toBeEmptyDOMElement()

    container.firstChild?.childNodes.forEach(({ nodeName }) => {
      expect(nodeName.toLowerCase()).toBe('option')
    })
  })

  it('renders with class "form-select"', () => {
    const { container } = render(<Form {...Form.args} />)

    expect(container.firstChild).toHaveClass('form-select')
  })
})
