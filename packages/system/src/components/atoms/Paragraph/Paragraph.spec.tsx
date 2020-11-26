import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Paragraph.stories'

/**
 * @file Tests - Paragraph
 * @module components/atoms/Paragraph/spec
 */

it('renders a <p> element', () => {
  const { getByText } = render(<Default {...Default.args} />)
  const { children } = Default.args as ArgsMatcher

  expect(getByText(children)).toBeInTheDocument()
})
