import { render } from '@testing-library/react'
import { LinkProps } from '../../atoms'
import { Sidebar } from './Menu.stories'

/**
 * @file Tests - Menu
 * @module components/molecules/Menu/spec
 */

it('renders the sidebar menu links', () => {
  const { getByText } = render(<Sidebar {...Sidebar.args} />)

  Sidebar.args.links?.map((link: LinkProps) => {
    expect(getByText(link.title as string)).toHaveClass('nav-link')
  })
})
