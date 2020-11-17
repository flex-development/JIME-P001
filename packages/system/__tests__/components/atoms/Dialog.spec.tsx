import { Default } from '@system/stories/lib/atoms/Dialog.stories'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - Dialog
 * @module tests/lib/atoms/Dialog
 */

it('renders without crashing', () => {
  const { container, getByText } = render(<Default {...Default.args} />)
  const { children } = Default.args

  expect(container.firstChild).toContainElement(getByText(children as string))
})
