import { AnyObject } from '@flex-development/kustomtypez'
import { render } from '@testing-library/react'
import React from 'react'
import {
  WithSummary
} from '../../../storybook/stories/lib/atoms/Details.stories'
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
