import { AnyObject } from '@flex-development/kustomtypez'
import { WithSummary } from '@kustomz-stories/atoms/Details.stories'
import { render } from '@testing-library/react'
import React from 'react'
import { ArgsMatcher } from '../../jest-env'

/**
 * @file Tests - Details
 * @module tests/lib/atoms/Details
 */

it('renders a nested <summary> element', () => {
  const { getByText } = render(<WithSummary {...WithSummary.args} />)
  const { children, summary } = (WithSummary.args || {}) as ArgsMatcher

  const ancestor = getByText(children)
  const descendant = getByText((summary as AnyObject).children)

  expect(ancestor).toContainElement(descendant)
})
