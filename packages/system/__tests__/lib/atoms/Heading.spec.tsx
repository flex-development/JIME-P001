import { render } from '@testing-library/react'
import React from 'react'
import { Default } from '../../../storybook/stories/lib/atoms/Heading.stories'
import { ArgsMatcher } from '../../jest-env'

/**
 * @file Tests - Heading
 * @module tests/lib/atoms/Heading
 */

it('renders <h1 class="heading">', () => {
  const { getByText } = render(<Default {...Default.args} />)
  const { children } = (Default.args || {}) as ArgsMatcher

  expect(getByText(children)).toHaveClass('heading')
})
