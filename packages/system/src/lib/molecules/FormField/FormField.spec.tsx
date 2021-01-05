import { render } from '@testing-library/react'
import { FormField } from './FormField'

/**
 * @file Tests - FormField
 * @module lib/molecules/FormField/spec
 */

describe('FormField', () => {
  it('renders with class "form-field"', () => {
    const { container } = render(<FormField label='' />)

    expect(container.firstChild).toHaveClass('form-field')
  })

  it('renders the label text', () => {
    const label = 'form label'
    const { getByText } = render(<FormField label={label} />)

    expect(getByText(label)).toHaveClass('form-field-label')
  })
})
