import { render } from '@testing-library/react'
import React from 'react'
import { Default } from '../../../storybook/stories/lib/atoms/Divider.stories'

/**
 * @file Tests - Divider
 * @module tests/lib/atoms/Divider
 */

it('renders <hr class="divider">', () => {
  const args = Object.assign({ 'data-testid': 'divider' }, Default.args)

  const { getByTestId } = render(<Default {...args} />)

  const element = getByTestId(args['data-testid'])

  expect(element).toBeInTheDocument()
  expect(element).toHaveClass('divider')
})
