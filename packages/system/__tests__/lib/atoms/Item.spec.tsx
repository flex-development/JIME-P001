import { Default } from '@kustomz-stories/atoms/Item.stories'
import { render } from '@testing-library/react'
import React from 'react'
import { ArgsMatcher } from '../../jest-env'

/**
 * @file Tests - Item
 * @module tests/lib/atoms/Item
 */

it('renders a <li> element', () => {
  const { getByText } = render(<Default {...Default.args} />)
  const { children } = Default.args as ArgsMatcher

  expect(getByText(children)).toBeInTheDocument()
})
