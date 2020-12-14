import { render } from '@testing-library/react'
import { Default } from './Item.stories'

/**
 * @file Tests - Item
 * @module components/ui/atoms/Item/spec
 */

it('renders a <li> element', () => {
  const { getByText } = render(<Default {...Default.args} />)
  const { children } = Default.args as ArgsMatcher

  expect(getByText(children)).toBeInTheDocument()
})
