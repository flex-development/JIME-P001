import { Quantity } from '@system/stories/lib/molecules/LabeledFormControl.stories'
import { Matcher, render, screen } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - LabeledFormControl
 * @module tests/lib/atoms/LabeledFormControl
 */

it('renders a nested <input type="number"> element', () => {
  const { container } = render(<Quantity {...Quantity.args} />)

  const descendent = screen.getByLabelText(Quantity.args?.children as Matcher)

  expect(container.firstChild).toContainElement(descendent)
  expect(descendent).toHaveAttribute('type', 'number')
})
