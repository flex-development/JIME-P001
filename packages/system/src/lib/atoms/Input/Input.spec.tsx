import { render } from '@testing-library/react'
import { Checkbox, Default, Radio } from './Input.stories'

/**
 * @file Tests - Input
 * @module lib/atoms/Input/spec
 */

describe('Input', () => {
  it('renders an <input> element', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('input')
  })

  it('adds the class "form-control" to non <input type="checkbox"> and <input type="radio"> elements, not "form-check-input" or "form-file-input"', () => {
    const { getByPlaceholderText } = render(<Default {...Default.args} />)

    const element = getByPlaceholderText(Default.args.placeholder as string)

    expect(element).toHaveAttribute('type', 'text')

    expect(element).toHaveClass('form-control')
    expect(element).not.toHaveClass('form-check-input')
    expect(element).not.toHaveClass('form-file-input')
  })

  it('adds the class "form-check-input" to <input type="checkbox">, not "form-control"', () => {
    const { container } = render(<Checkbox {...Checkbox.args} />)

    expect(container.firstChild).toHaveAttribute('type', 'checkbox')

    expect(container.firstChild).toHaveClass('form-check-input')
    expect(container.firstChild).not.toHaveClass('form-control')
  })

  it('adds the class "form-check-input" to <input type="radio"> elements, not "form-control"', () => {
    const { container } = render(<Radio {...Radio.args} />)

    expect(container.firstChild).toHaveAttribute('type', 'radio')

    expect(container.firstChild).toHaveClass('form-check-input')
    expect(container.firstChild).not.toHaveClass('form-control')
  })
})
