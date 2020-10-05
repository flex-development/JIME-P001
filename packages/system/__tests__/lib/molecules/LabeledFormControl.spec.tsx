import { Quantity } from '@kustomz-stories/molecules/LabeledFormControl.stories'
import { LabeledFormControlProps } from '@kustomz/lib'
import { Matcher, render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - LabeledFormControl
 * @module tests/lib/atoms/LabeledFormControl
 */

it('renders a nested <input type="number"> element', () => {
  const { container, getByDisplayValue } = render(
    <Quantity {...(Quantity.args as LabeledFormControlProps)} />
  )

  const display_value = Quantity.args?.control.defaultValue
  const descendent = getByDisplayValue(display_value as Matcher)

  expect(container.firstChild).toContainElement(descendent)
  expect(descendent).toHaveAttribute('type', 'number')
})
