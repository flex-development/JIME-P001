import { render } from '@testing-library/react'
import { ProductTemplate } from './ProductTemplate'
import { AshTray } from './ProductTemplate.stories'

/**
 * @file Tests - ProductTemplate
 * @module components/ui/templates/ProductTemplate/spec
 */

it('renders without crashing', () => {
  const { template_id } = ProductTemplate

  const { container } = render(<AshTray {...AshTray.args} />)

  expect(container.firstChild).toHaveClass('template')
  expect(container.firstChild).toHaveAttribute('data-template', template_id)
})
