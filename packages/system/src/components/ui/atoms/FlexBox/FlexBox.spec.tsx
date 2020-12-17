import { render } from '@testing-library/react'
import { FlexBox } from './FlexBox'

/**
 * @file Tests - FlexBox
 * @module components/ui/atoms/FlexBox/spec
 * @see https://v5.getbootstrap.com/docs/5.0/utilities/flex/
 */

describe('FlexBox', () => {
  it('renders a <div> element', () => {
    const { container } = render(<FlexBox />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('div')
  })

  it('renders with class "d-flex"', () => {
    const { container } = render(<FlexBox />)

    expect(container.firstChild).toHaveClass('d-flex')
  })

  it('renders with class "d-sm-flex"', () => {
    const { container } = render(<FlexBox display={{ sm: 'flex' }} />)

    expect(container.firstChild).toHaveClass('d-sm-flex')
  })

  it('renders with class "d-inline-flex"', () => {
    const { container } = render(<FlexBox display='inline-flex' />)

    expect(container.firstChild).toHaveClass('d-inline-flex')
  })

  it('renders with class "d-sm-inline-flex"', () => {
    const { container } = render(<FlexBox display={{ sm: 'inline-flex' }} />)

    expect(container.firstChild).toHaveClass('d-sm-inline-flex')
  })

  it('renders with class "flex-column"', () => {
    const { container } = render(<FlexBox direction='column' />)

    expect(container.firstChild).toHaveClass('flex-column')
  })

  it('renders with class "flex-sm-column"', () => {
    const { container } = render(<FlexBox direction={{ sm: 'column' }} />)

    expect(container.firstChild).toHaveClass('flex-sm-column')
  })

  it('renders with class "justify-content-end"', () => {
    const { container } = render(<FlexBox justify='end' />)

    expect(container.firstChild).toHaveClass('justify-content-end')
  })

  it('renders with class "justify-content-sm-end"', () => {
    const { container } = render(<FlexBox justify={{ sm: 'end' }} />)

    expect(container.firstChild).toHaveClass('justify-content-sm-end')
  })

  it('renders with class "align-items-end"', () => {
    const { container } = render(<FlexBox align='end' />)

    expect(container.firstChild).toHaveClass('align-items-end')
  })

  it('renders with class "align-items-sm-end"', () => {
    const { container } = render(<FlexBox align={{ sm: 'end' }} />)

    expect(container.firstChild).toHaveClass('align-items-sm-end')
  })

  it('renders with class "flex-nowrap"', () => {
    const { container } = render(<FlexBox wrap='nowrap' />)

    expect(container.firstChild).toHaveClass('flex-nowrap')
  })

  it('renders with class "flex-sm-nowrap"', () => {
    const { container } = render(<FlexBox wrap={{ sm: 'nowrap' }} />)

    expect(container.firstChild).toHaveClass('flex-sm-nowrap')
  })
})
