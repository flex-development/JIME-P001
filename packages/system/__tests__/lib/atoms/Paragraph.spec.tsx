import { render } from '@testing-library/react'
import React from 'react'
import { Default } from '../../../storybook/stories/lib/atoms/Paragraph.stories'
import { ArgsMatcher } from '../../jest-env'

/**
 * @file Tests - Paragraph
 * @module tests/lib/atoms/Paragraph
 */

it('renders a <p> element', () => {
  const { getByText } = render(<Default {...Default.args} />)
  const { children } = (Default.args || {}) as ArgsMatcher

  expect(getByText(children)).toBeInTheDocument()
})