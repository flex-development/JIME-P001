import { Default } from '@kustomz-stories/atoms/Option.stories'
import { Matcher, render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - Option
 * @module tests/lib/atoms/Option
 */

it('renders an <option> element', () => {
  const { getByLabelText } = render(<Default {...Default.args} />)

  expect(getByLabelText(Default.args.label as Matcher)).toBeInTheDocument()
})
