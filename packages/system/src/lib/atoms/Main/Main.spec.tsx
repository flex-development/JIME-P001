import { render } from '@testing-library/react'
import { Main } from './Main'

/**
 * @file Tests - Main
 * @module lib/atoms/Main/spec
 */

describe('Main', () => {
  it('renders a <main> element', () => {
    const { container } = render(<Main />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('main')
  })

  it('renders with class "template"', () => {
    const TEMPLATE_ID = 'TEMPLATE_ID'

    const { container } = render(<Main data-template={TEMPLATE_ID} />)

    expect(container.firstChild).toHaveAttribute('data-template', TEMPLATE_ID)
    expect(container.firstChild).toHaveAttribute('id', TEMPLATE_ID)
    expect(container.firstChild).toHaveClass('template')
  })
})
