import { AnyObject } from '@flex-development/json'
import { render } from '@testing-library/react'
import { WithSummary } from './Details.stories'

/**
 * @file Tests - Details
 * @module components/ui/atoms/Details/spec
 */

it('renders a nested <summary> element', () => {
  const { getByText } = render(<WithSummary {...WithSummary.args} />)
  const { children, summary } = WithSummary.args as ArgsMatcher

  const ancestor = getByText(children)
  const descendant = getByText((summary as AnyObject).children)

  expect(ancestor).toContainElement(descendant)
})
