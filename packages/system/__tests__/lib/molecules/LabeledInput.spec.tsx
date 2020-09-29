import { render } from '@testing-library/react'
import React from 'react'
import { Quantity } from '../../../storybook/stories/lib/molecules/LabeledInput.stories'

/**
 * @file Tests - LabeledInput
 * @module tests/lib/atoms/LabeledInput
 */

it('renders a nested <input type="number"> element', () => {
  const args = {
    ...Quantity.args,
    'data-testid': 'label',
    input: { ...Quantity.args?.input, 'data-testid': 'input' }
  }

  const { getByTestId } = render(<Quantity {...args} />)

  const ancestor = getByTestId(args['data-testid'])
  const descendent = getByTestId(args.input?.['data-testid'])

  expect(ancestor).toContainElement(descendent)
  expect(descendent).toHaveAttribute('type', 'number')
})
