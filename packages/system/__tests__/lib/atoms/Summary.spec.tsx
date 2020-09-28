import { render } from '@testing-library/react'
import React from 'react'
import {
  Default
} from '../../../storybook/stories/lib/atoms/Summary.stories'
import { ArgsMatcher } from '../../jest-env'

/**
 * @file Tests - Summary
 * @module tests/lib/atoms/Summary
 */

it('renders a <summary> element', () => {
  const { getByText } = render(<Default {...Default.args} />)
  const { children } = (Default.args || {}) as ArgsMatcher

  expect(getByText(children)).toBeInTheDocument()
})
