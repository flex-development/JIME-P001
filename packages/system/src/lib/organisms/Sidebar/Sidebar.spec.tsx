import type { LinkProps } from '@system/lib/atoms/Link'
import type { Matcher } from '@testing-library/react'
import { render } from '@testing-library/react'
import { Sidebar } from './Sidebar'
import type { SidebarProps } from './Sidebar.props'
import { Default } from './Sidebar.stories'

/**
 * @file Tests - Sidebar
 * @module lib/organisms/Sidebar/spec
 */

describe('Sidebar', () => {
  it('renders with class "sidebar"', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild).toHaveClass('sidebar')
  })

  it('displays the profile age', () => {
    const { getByText } = render(<Default {...Default.args} />)
    const { age } = Sidebar?.defaultProps as SidebarProps

    expect(getByText(`${age} years old`)).toBeInTheDocument()
  })

  it('displays the profile image', () => {
    const { getByAltText } = render(<Default {...Default.args} />)

    const img = Sidebar.defaultProps?.img as string

    expect(getByAltText('Profile image for Morena')).toHaveAttribute('src', img)
  })

  it('displays the profile location', () => {
    const { getByText } = render(<Default {...Default.args} />)

    const location = Sidebar.defaultProps?.location as string

    expect(getByText(location)).toBeInTheDocument()
  })

  it('displays the profile mood', () => {
    const { getByText } = render(<Default {...Default.args} />)

    const mood = Sidebar.defaultProps?.mood as string

    expect(getByText(`Mood: ${mood}`)).toBeInTheDocument()
  })

  it('displays the sidebar menu links', () => {
    const { getByText } = render(<Default {...Default.args} />)

    Default.args.menu?.forEach((link: LinkProps) => {
      expect(getByText(link.title as Matcher)).toHaveClass('menu-link')
    })
  })
})
