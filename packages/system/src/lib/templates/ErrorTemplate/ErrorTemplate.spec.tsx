import { render } from '@testing-library/react'
import { ErrorTemplate } from './ErrorTemplate'
import { NotFound } from './ErrorTemplate.stories'

/**
 * @file Tests - ErrorTemplate
 * @module lib/templates/ErrorTemplate/spec
 */

describe('ErrorTemplate', () => {
  it('renders with class "template" and data-template=${template_id}', () => {
    const { template_id } = ErrorTemplate

    const { container } = render(<NotFound {...NotFound.args} />)

    expect(container.firstChild).toHaveClass('template error-template')
    expect(container.firstChild).toHaveAttribute('data-template', template_id)
  })

  it('renders the error code', () => {
    const { getByText } = render(<NotFound {...NotFound.args} />)
    const { code } = NotFound.args || {}

    expect(getByText(`${code}`)).toHaveClass('error-template-code')
  })

  it('renders the error message', () => {
    const { getByText } = render(<NotFound {...NotFound.args} />)
    const { message } = NotFound.args || {}

    expect(getByText(message as string)).toHaveClass('error-template-message')
  })
})
