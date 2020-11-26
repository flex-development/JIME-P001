import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Span.stories'

/**
 * @file Tests - Span
 * @module components/atoms/Span/spec
 */

it('renders a <span> element', () => {
  const { getByText } = render(<Default {...Default.args} />)
  const { children } = Default.args as ArgsMatcher

  expect(getByText(children)).toBeInTheDocument()
})
