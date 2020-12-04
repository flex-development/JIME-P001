import { Matcher, render } from '@testing-library/react'
import { Default } from './Option.stories'

/**
 * @file Tests - Option
 * @module components/atoms/Option/impl
 */

it('renders an <option> element', () => {
  const { getByLabelText } = render(<Default {...Default.args} />)

  expect(getByLabelText(Default.args.label as Matcher)).toBeInTheDocument()
})
