import { render } from '@testing-library/react'
import { Default } from './Label.stories'

/**
 * @file Tests - Label
 * @module components/ui/atoms/Label/spec
 */

describe('Label', () => {
  it('renders a <label> element', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('label')
  })

  it('adds the class "form-label" when props.form is true', () => {
    const { container } = render(<Default {...Default.args} form />)

    expect(container.firstChild).toHaveClass('form-label')
  })

  it('renders text with an asterisk when props.required is true and adds data-required attribute', () => {
    const { getByText } = render(<Default {...Default.args} required />)

    const text_with_asterisk = `*${Default.args?.children}`

    expect(getByText(text_with_asterisk)).toHaveAttribute('data-required')
  })
})
