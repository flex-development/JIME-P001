import { LinkProps } from '@system/components/ui/atoms'
import { render } from '@testing-library/react'
import { Sidebar } from './Menu.stories'

/**
 * @file Tests - Menu
 * @module components/ui/molecules/Menu/spec
 */

describe('Menu', () => {
  it('renders the sidebar menu links', () => {
    const { getByText } = render(<Sidebar {...Sidebar.args} />)

    Sidebar.args.links?.map((link: LinkProps) => {
      expect(getByText(link.title as string)).toHaveClass('nav-link')
    })
  })
})
