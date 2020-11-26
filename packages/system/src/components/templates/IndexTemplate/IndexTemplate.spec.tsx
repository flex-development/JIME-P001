import { render } from '@testing-library/react'
import React from 'react'
import { IndexTemplate } from './IndexTemplate'
import { Homepage } from './IndexTemplate.stories'

/**
 * @file Tests - IndexTemplate
 * @module components/templates/IndexTemplate/spec
 */

it('renders without crashing', () => {
  const { template_id } = IndexTemplate

  const { container } = render(<Homepage {...Homepage.args} />)

  expect(container.firstChild).toHaveClass('template')
  expect(container.firstChild).toHaveAttribute('data-template', template_id)
})
