import { render } from '@testing-library/react'
import { Layout } from './Layout'
import { Home } from './Layout.stories'

/**
 * @file Tests - Layout
 * @module lib/templates/Layout/spec
 */

describe('Layout', () => {
  it('[FALSE ALARM] renders with class "layout" and template_id', () => {
    const { template_id } = Layout

    const { container } = render(<Home {...Home.args} />)

    expect(container.firstChild).toHaveClass('layout')
    expect(container.firstChild).toHaveAttribute('data-template', template_id)
  })
})
