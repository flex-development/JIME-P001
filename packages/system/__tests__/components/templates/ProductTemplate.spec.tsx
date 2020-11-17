import { ProductTemplate } from '@system/components'
import { AshTray } from '@system/stories/lib/templates/ProductTemplate.stories'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - ProductTemplate
 * @module tests/lib/templates/ProductTemplate
 */

it('renders without crashing', () => {
  const { template_id } = ProductTemplate

  const { container } = render(<AshTray {...AshTray.args} />)

  expect(container.firstChild).toHaveClass('template')
  expect(container.firstChild).toHaveAttribute('data-template', template_id)
})
