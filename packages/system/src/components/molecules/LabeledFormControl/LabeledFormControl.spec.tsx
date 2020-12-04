import { Matcher, render, screen } from '@testing-library/react'
import { Quantity } from './LabeledFormControl.stories'

/**
 * @file Tests - LabeledFormControl
 * @module components/molecules/LabeledFormControl/impl
 */

it('renders a nested <input type="number"> element', () => {
  const { container } = render(<Quantity {...Quantity.args} />)

  const descendent = screen.getByLabelText(Quantity.args?.children as Matcher)

  expect(container.firstChild).toContainElement(descendent)
  expect(descendent).toHaveAttribute('type', 'number')
})
