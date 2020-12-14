import { render } from '@testing-library/react'
import { Default } from './Heading.stories'

/**
 * @file Tests - Heading
 * @module components/ui/atoms/Heading/spec
 */

it('renders a heading element', () => {
  const { getByText } = render(<Default {...Default.args} />)

  expect(getByText((Default.args as ArgsMatcher).children)).toBeInTheDocument()
})
