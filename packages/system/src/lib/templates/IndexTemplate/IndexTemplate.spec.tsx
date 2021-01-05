import { render } from '@testing-library/react'
import { IndexTemplate } from './IndexTemplate'
import { Homepage } from './IndexTemplate.stories'

/**
 * @file Tests - IndexTemplate
 * @module lib/templates/IndexTemplate/spec
 */

describe('IndexTemplate', () => {
  it('renders with class "template" and data-template=${template_id}', () => {
    const { template_id } = IndexTemplate

    const { container } = render(<Homepage {...Homepage.args} />)

    expect(container.firstChild).toHaveClass('template index-template')
    expect(container.firstChild).toHaveAttribute('data-template', template_id)
  })
})
