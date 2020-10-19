import { Homepage } from '@system/stories/lib/templates/IndexTemplate.stories'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - IndexTemplate
 * @module tests/lib/templates/IndexTemplate
 */

it('renders without crashing', () => {
  const { container } = render(<Homepage {...Homepage.args} />)

  expect(container.firstChild).toHaveClass('index-template')
  expect(container.firstChild).toHaveAttribute('data-template', 'index')
})
