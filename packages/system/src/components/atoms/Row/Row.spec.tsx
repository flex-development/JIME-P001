import { render } from '@testing-library/react'
import { Row } from './Row'

/**
 * @file Tests - Row
 * @module components/atoms/Row/impl
 */

it('renders without crashing', () => {
  const { container } = render(<Row />)

  expect(container.firstChild).toHaveClass('row')
})
