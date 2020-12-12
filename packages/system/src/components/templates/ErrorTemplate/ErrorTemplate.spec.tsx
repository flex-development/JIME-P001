import { render } from '@testing-library/react'
import { ErrorTemplate } from './ErrorTemplate'
import { NotFound } from './ErrorTemplate.stories'

/**
 * @file Tests - ErrorTemplate
 * @module components/templates/ErrorTemplate/spec
 */

it('renders without crashing', () => {
  const { template_id } = ErrorTemplate

  const { container } = render(<NotFound {...NotFound.args} />)

  expect(container.firstChild).toHaveClass('template')
  expect(container.firstChild).toHaveAttribute('data-template', template_id)
})

it('renders the error code', () => {
  const { getByText } = render(<NotFound {...NotFound.args} />)

  expect(getByText(`${NotFound.args.code}`)).toHaveClass('error-code')
})

it('renders the error message', () => {
  const { getByText } = render(<NotFound {...NotFound.args} />)
  const { message } = NotFound.args || {}

  expect(getByText(message as string)).toHaveClass('error-message')
})
