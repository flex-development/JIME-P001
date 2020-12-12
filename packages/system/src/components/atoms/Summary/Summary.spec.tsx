import { render } from '@testing-library/react'
import { Default } from './Summary.stories'

/**
 * @file Tests - Summary
 * @module components/atoms/Summary/spec
 */

it('renders a <summary> element', () => {
  const { getByText } = render(<Default {...Default.args} />)
  const { children } = Default.args as ArgsMatcher

  expect(getByText(children)).toBeInTheDocument()
})
