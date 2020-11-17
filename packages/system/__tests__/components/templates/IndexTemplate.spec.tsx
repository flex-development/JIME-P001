import { IndexTemplate } from '@system/components'
import { Homepage } from '@system/stories/lib/templates/IndexTemplate.stories'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - IndexTemplate
 * @module tests/lib/templates/IndexTemplate
 */

it('renders without crashing', () => {
  const { template_id } = IndexTemplate

  const { container } = render(<Homepage {...Homepage.args} />)

  expect(container.firstChild).toHaveClass('template')
  expect(container.firstChild).toHaveAttribute('data-template', template_id)
})
