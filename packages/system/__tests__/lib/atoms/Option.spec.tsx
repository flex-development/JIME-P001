import { render } from '@testing-library/react'
import React from 'react'
import { Default } from '../../../storybook/stories/lib/atoms/Option.stories'

/**
 * @file Tests - Option
 * @module tests/lib/atoms/Option
 */

it('renders an <option> element', () => {
  const args = { 'data-testid': 'option', ...Default.args }

  const { getByTestId } = render(<Default {...args} />)

  expect(getByTestId(args['data-testid'])).toBeInTheDocument()
})
