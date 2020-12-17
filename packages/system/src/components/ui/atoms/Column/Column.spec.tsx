import { render } from '@testing-library/react'
import { Column } from './Column'

/**
 * @file Tests - Column
 * @module components/ui/atoms/Column/spec
 * @see https://v5.getbootstrap.com/docs/5.0/layout/columns/
 */

describe('Column', () => {
  it('renders a <div> element', () => {
    const { container } = render(<Column />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('div')
  })

  it('renders with class "col"', () => {
    const { container } = render(<Column />)

    expect(container.firstChild).toHaveClass('col')
  })

  it('renders with class "col-md", not "col" if not specified', () => {
    const { container } = render(<Column md />)

    expect(container.firstChild).not.toHaveClass('col')
    expect(container.firstChild).toHaveClass('col-md')
  })

  it('renders with class "col-lg-5", not "col" if not specified', () => {
    const { container } = render(<Column lg={5} />)

    expect(container.firstChild).not.toHaveClass('col')
    expect(container.firstChild).toHaveClass('col-lg-5')
  })

  it('renders with class "col-lg-5" and col-7', () => {
    const { container } = render(<Column lg={5} xs={7} />)

    expect(container.firstChild).toHaveClass('col-lg-5')
    expect(container.firstChild).toHaveClass('col-7')
  })
})
