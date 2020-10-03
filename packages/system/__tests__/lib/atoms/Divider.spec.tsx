import { Default } from '@kustomz-stories/atoms/Divider.stories'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - Divider
 * @module tests/lib/atoms/Divider
 */

it('renders <hr class="divider">', () => {
  const args = { 'data-testid': 'divider', ...Default.args }

  const { getByTestId } = render(<Default {...args} />)

  const element = getByTestId(args['data-testid'])

  expect(element).toBeInTheDocument()
  expect(element).toHaveClass('divider')
})
