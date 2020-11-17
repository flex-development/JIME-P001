import { LinkProps } from '@system/components'
import { Sidebar } from '@system/stories/lib/molecules/Menu.stories'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - Menu
 * @module tests/lib/molecules/Menu
 */

it('renders the sidebar menu links', () => {
  const { getByText } = render(<Sidebar {...Sidebar.args} />)

  Sidebar.args.links?.map((link: LinkProps) => {
    expect(getByText(link.title as string)).toHaveClass('nav-link')
  })
})
