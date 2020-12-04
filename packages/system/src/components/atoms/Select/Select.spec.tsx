import { render } from '@testing-library/react'
import { Default } from './Select.stories'

/**
 * @file Tests - Select
 * @module components/atoms/Select/impl
 */

it('renders a <select> element with nested <option> elements', () => {
  const { container } = render(<Default {...Default.args} />)

  expect(container.firstChild).not.toBeEmptyDOMElement()
})
