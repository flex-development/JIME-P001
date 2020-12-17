import { render } from '@testing-library/react'
import { Row } from './Row'

/**
 * @file Tests - Row
 * @module components/ui/atoms/Row/spec
 */

describe('Row', () => {
  it('renders a <div> element', () => {
    const { container } = render(<Row />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('div')
  })

  it('renders with class "row"', () => {
    const { container } = render(<Row />)

    expect(container.firstChild).toHaveClass('row')
  })
})
