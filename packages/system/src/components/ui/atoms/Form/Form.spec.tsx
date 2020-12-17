import { render } from '@testing-library/react'
import { Form } from './Form'

/**
 * @file Tests - Form
 * @module components/ui/atoms/Form/spec
 */

describe('Form', () => {
  it('renders a <form> element', () => {
    const { container } = render(<Form />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('form')
  })

  it('renders with class "form"', () => {
    const { container } = render(<Form />)

    expect(container.firstChild).toHaveClass('form')
  })
})
