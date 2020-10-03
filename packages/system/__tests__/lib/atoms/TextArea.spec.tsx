import { Default } from '@kustomz-stories/atoms/TextArea.stories'
import { render } from '@testing-library/react'
import React from 'react'
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
