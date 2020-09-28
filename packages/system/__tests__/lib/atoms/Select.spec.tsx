import { render } from '@testing-library/react'
import React from 'react'
import {
  Default
} from '../../../storybook/stories/lib/atoms/Select.stories'
import { ArgsMatcher } from '../../jest-env'

/**
 * @file Tests - Select
 * @module tests/lib/atoms/Select
 */

it('renders a <select> element with nested <option> elements', () => {
  const args: ArgsMatcher = Object.assign({
    'data-testid': 'select'
  }, Default.args as ArgsMatcher)

  const { getByTestId } = render(<Default {...args} />)

  expect(getByTestId(args['data-testid'])).not.toBeEmptyDOMElement()
})
