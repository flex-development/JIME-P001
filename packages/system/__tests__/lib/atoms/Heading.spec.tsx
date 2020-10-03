import { Default } from '@kustomz-stories/atoms/Heading.stories'
import { render } from '@testing-library/react'
import React from 'react'
import { ArgsMatcher } from '../../jest-env'

/**
 * @file Tests - Heading
 * @module tests/lib/atoms/Heading
 */

it('renders a heading element', () => {
  const { getByText } = render(<Default {...Default.args} />)
  const { children } = (Default.args || {}) as ArgsMatcher

  expect(getByText(children)).toBeInTheDocument()
})
