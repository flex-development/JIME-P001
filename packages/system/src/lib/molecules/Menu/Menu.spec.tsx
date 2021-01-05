import { LinkProps } from '@system/lib/atoms'
import { render } from '@testing-library/react'
import { Menu } from './Menu'
import { Sidebar } from './Menu.stories'

/**
 * @file Tests - Menu
 * @module lib/molecules/Menu/spec
 */

describe('Menu', () => {
  it('renders with class "menu"', () => {
    const { container } = render(<Menu />)

    expect(container.firstChild).toHaveClass('menu')
  })

  it('renders the sidebar menu links', () => {
    const { getByText } = render(<Sidebar {...Sidebar.args} />)

    Sidebar.args.$items?.map((link: LinkProps) => {
      expect(getByText(link.title as string)).toHaveClass('menu-link')
    })
  })
})
