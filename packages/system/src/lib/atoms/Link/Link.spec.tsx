import { render } from '@testing-library/react'
import { Button, Default, Dropdown, DropdownToggle, Nav } from './Link.stories'

/**
 * @file Tests - Link
 * @module lib/atoms/Link/spec
 */

describe('Link', () => {
  it('renders an <a> element', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('a')
  })

  it('renders with default href attribute', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild).toHaveAttribute('href', '#')
  })

  it('renders with class "active"', () => {
    const { getByText } = render(<Default {...Default.args} $active />)
    const { children } = Default.args as ArgsMatcher

    expect(getByText(children)).toHaveClass('active')
  })

  it('renders with class "disabled"', () => {
    const { container } = render(<Default {...Default.args} disabled />)

    expect(container.firstChild).toHaveClass('disabled')
  })

  it('renders with class "btn"', () => {
    const { container } = render(<Button {...Button.args} />)

    expect(container.firstChild).toHaveClass(`btn btn-${Button.args.$btn}`)
  })

  it('renders with class "dropdown-item"', () => {
    const { container } = render(<Dropdown {...Dropdown.args} />)

    expect(container.firstChild).toHaveClass('dropdown-item')
  })

  it('creates a dropdown toggle link', () => {
    const { getByText } = render(<DropdownToggle {...DropdownToggle.args} />)

    const element = getByText(DropdownToggle.args.children as string)

    expect(element).toHaveAttribute('aria-expanded', 'false')
    expect(element).toHaveAttribute('data-toggle', 'dropdown')
    expect(element).toHaveAttribute('role', 'button')
    expect(element).toHaveClass('dropdown-toggle')
  })

  it('renders with class "nav-link"', () => {
    const { getByText } = render(<Nav {...Nav.args} />)

    expect(getByText(Nav.args.children as string)).toHaveClass('menu-link')
  })
})
