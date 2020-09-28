import { render } from '@testing-library/react'
import React from 'react'
import {
  Default
} from '../../../storybook/stories/lib/atoms/Span.stories'
import { ArgsMatcher } from '../../jest-env'

/**
 * @file Tests - Span
 * @module tests/lib/atoms/Span
 */

it('renders a <span> element', () => {
  const { getByText } = render(<Default {...Default.args} />)
  const { children } = (Default.args || {}) as ArgsMatcher

  expect(getByText(children)).toBeInTheDocument()
})
