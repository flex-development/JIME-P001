import { Default } from '@kustomz-stories/atoms/Select.stories'
import { render } from '@testing-library/react'
import React from 'react'
import { ArgsMatcher } from '../../jest-env'

/**
 * @file Tests - Select
 * @module tests/lib/atoms/Select
 */

it('renders a <select> element with nested <option> elements', () => {
  const args: ArgsMatcher = {
    'data-testid': 'select',
    ...(Default.args as ArgsMatcher)
  }

  const { getByTestId } = render(<Default {...args} />)

  expect(getByTestId(args['data-testid'])).not.toBeEmptyDOMElement()
})
