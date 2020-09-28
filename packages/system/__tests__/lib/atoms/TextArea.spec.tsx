import { render } from '@testing-library/react'
import React from 'react'
import {
  Default
} from '../../../storybook/stories/lib/atoms/TextArea.stories'
import { ArgsMatcher } from '../../jest-env'

/**
 * @file Tests - TextArea
 * @module tests/lib/atoms/TextArea
 */

it('renders <textarea class="form-control">', () => {
  const { getByPlaceholderText } = render(<Default {...Default.args} />)
  const { placeholder } = (Default.args || {}) as ArgsMatcher

  expect(getByPlaceholderText(placeholder)).toHaveClass('form-control')
})
