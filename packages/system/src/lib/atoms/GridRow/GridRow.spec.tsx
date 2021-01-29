import { render } from '@testing-library/react'
import { GridRow } from './GridRow'

/**
 * @file Tests - GridRow
 * @module lib/atoms/GridRow/spec
 */

describe('GridRow', () => {
  it('renders a <div> element', () => {
    const { container } = render(<GridRow />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('div')
  })

  it('renders with class "md:row-full"', () => {
    const { container } = render(<GridRow $md />)

    expect(container.firstChild).toHaveClass('md:row-full')
  })

  it('renders with class "lg:row-5"', () => {
    const { container } = render(<GridRow $lg={5} />)

    expect(container.firstChild).toHaveClass('lg:row-5')
  })

  it('renders with classes "lg:row-5" and "row-7"', () => {
    const { container } = render(<GridRow $lg={5} $xs={7} />)

    expect(container.firstChild).toHaveClass('lg:row-5')
    expect(container.firstChild).toHaveClass('row-7')
  })
})
